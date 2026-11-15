import {Component,lazy,Suspense,useEffect,useRef,useState} from 'react';
import {RotateCcw,MapPinned} from 'lucide-react';
import {createSectorMap} from '../integrations/map.js';
import {drawGrid,drawHazards,drawRoute,drawMarkers} from '../integrations/sector-layers.js';
import {gridCornerToLatLng,latLngToGrid} from '../domain/geo.js';
import {SECTOR} from '../domain/sector.js';

const PlanetaryGlobe=lazy(()=>import('./PlanetaryGlobe.jsx'));
class GlobeBoundary extends Component {state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?<div className="planetary-overview"><h3>Illustrative Planetary Overview</h3><p>3D unavailable.</p><button className="button" onClick={this.props.onExplore}>Explore Jezero</button></div>:this.props.children;}}

export default function MapPanel({state,actions,view='map',fullscreen=false,compact=false,onExplore}){
 const host=useRef(null),live=useRef(null),callbacks=useRef(actions);
 callbacks.current=actions;
 const [readout,setReadout]=useState('DERIVED coordinates: move over the map.'),[tileError,setTileError]=useState(''),[zoom,setZoom]=useState(12);
 const [layers,setLayers]=useState({tiles:true,grid:true,markers:true,hazards:true}),[opacity,setOpacity]=useState(1);
 useEffect(()=>{
   const element=host.current;
   const viewport=createSectorMap(element,{tileTemplate:import.meta.env.BASE_URL+'assets/trek/{z}/{y}-{x}.png',onPointer:ll=>{const cell=latLngToGrid(SECTOR,ll);setReadout(`DERIVED: ${ll.lat.toFixed(5)} N, ${ll.lng.toFixed(5)} E · ${cell?`grid cell ${cell.x}, ${cell.y} (row 0 = north)`:'outside the simulated sector'}`);},onTileError:()=>setTileError('Cached orbital tiles unavailable; routing remains independent of imagery.'),onZoomChange:setZoom});
   const map=viewport.map;
   live.current={...viewport,grid:drawGrid(map),hazards:L.layerGroup().addTo(map),routes:L.layerGroup().addTo(map),markers:L.layerGroup().addTo(map),fog:L.layerGroup().addTo(map)};
   const preserveSize=()=>{const center=map.getCenter(),zoom=map.getZoom();map.invalidateSize({pan:true,animate:false});map.setView(center,zoom,{animate:false,reset:true});};
   live.current.invalidate=preserveSize;
   const resize=new ResizeObserver(preserveSize);resize.observe(element);
   if(import.meta.env.DEV)element.__map=map;
   return()=>{resize.disconnect();map.remove();live.current=null;delete element.__map;};
 },[]);
 useEffect(()=>{
   const v=live.current;if(!v)return;
   drawHazards(v.hazards,state.grid);v.routes.clearLayers();
   if(state.sample){drawRoute(v.routes,state.sample.trail,{color:'#ffd38a'});drawRoute(v.routes,state.recon?(state.result?.path||[]):state.sample.future,{dashed:true,color:'#8eece0'});}
   else if(state.result){if(state.before)drawRoute(v.routes,state.before.path,{dashed:true,color:'#bac4ca'});drawRoute(v.routes,state.result.path);}
   drawMarkers(v.markers,{hab:SECTOR.hab,stops:state.stops,current:state.displayed,selected:state.stops.map(s=>s.selected),onSelectHab:()=>callbacks.current.returnHome(),onSelectStop:s=>callbacks.current.select(s.id)});
   v.fog.clearLayers();
   if(state.recon)for(let y=0;y<40;y++)for(let x=0;x<40;x++)if(!state.known.has(y*40+x)){
     const a=gridCornerToLatLng(SECTOR,x,y),b=gridCornerToLatLng(SECTOR,x+1,y+1);
     L.rectangle([[a.lat,a.lng],[b.lat,b.lng]],{pane:'fog',interactive:false,fill:false,color:'#e1b475',weight:.7,dashArray:'2 4'}).addTo(v.fog);
   }
 },[state]);
 useEffect(()=>{
   const v=live.current;if(!v)return;
   for(const [key,layer] of [['tiles',v.tiles],['grid',v.grid],['markers',v.markers],['hazards',v.hazards]]){if(layers[key])layer.addTo(v.map);else layer.remove();}
   v.tiles.setOpacity(opacity);
 },[layers,opacity]);
 useEffect(()=>{const frame=requestAnimationFrame(()=>live.current?.invalidate());return()=>cancelAnimationFrame(frame);},[fullscreen,view]);
 const toggle=key=>setLayers(s=>({...s,[key]:!s[key]}));
 return <section className={'map-panel panel '+(compact?'compact-map':'')}>
 <div className="map-top"><div><h2 className="eyebrow">{view==='map'?'MARS MAP':'MARS GLOBE'}</h2><h3>{view==='map'?'Registered surface map · Jezero':'Planetary mode · Mars'}</h3><p className="muted small">{view==='map'?'SIMULATED SECTOR / OBSERVED IMAGERY':'SIMULATED PLANETARY ARTWORK'}</p></div><MapPinned size={24} className="muted-icon"/></div>
 <div className="map-surface"><div ref={host} className="map-host" id={compact?'tablet-map':'mars-map'} aria-label="Registered NASA Jezero Mars map" style={{visibility:view==='map'?'visible':'hidden'}}/>
 {view!=='map'&&<GlobeBoundary onExplore={onExplore}><Suspense fallback={<div className="planetary-overview"><p>Loading illustrative globe?</p><button className="button" onClick={onExplore}>Explore Jezero</button></div>}><PlanetaryGlobe onExplore={onExplore}/></Suspense></GlobeBoundary>}</div>
 <div className="map-bottom" hidden={view!=='map'}><span>H Hab · 1–3 Science stops · ● Position<br/>Solid: proposed / traveled · Dashed: before dust / future</span><button className="button" onClick={()=>live.current?.resetView()}><RotateCcw size={15}/> Reset view</button></div>
 <p hidden={view!=='map'} className="tiny muted" role="status">{readout} {tileError} {zoom>12?'Overzoom: level 12 enlarged; no extra detail.':''}</p>
 {!compact&&view==='map'&&<details className="layer-options"><summary>Layers & provenance</summary><div className="layer-controls">{[['tiles','OBSERVED orbital imagery'],['grid','SIMULATED sector grid'],['markers','SIMULATED mission markers'],['hazards','SIMULATED hazard shading']].map(([key,label])=><label key={key}><input type="checkbox" checked={layers[key]} onChange={()=>toggle(key)}/>{label}</label>)}<label>Orbital opacity <input aria-label="Orbital opacity" type="range" min="0" max="1" step=".05" value={opacity} onChange={e=>setOpacity(Number(e.target.value))}/></label></div><p className="tiny">40 × 40 nominal 100 m cells. DERIVED bounds: {SECTOR.bounds.west.toFixed(5)}–{SECTOR.bounds.east.toFixed(5)} E, {SECTOR.bounds.south.toFixed(5)}–{SECTOR.bounds.north.toFixed(5)} N. Sector placement and all stops are hypothetical; coordinate arithmetic uses the Mars 2000 sphere. Hazard blocking remains active when shading is hidden.</p></details>}
 </section>;
}
