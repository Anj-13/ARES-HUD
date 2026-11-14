import {parsePlan} from './plan.js';
import {createSectorMap} from './map.js';
import {drawGrid,drawHazards,drawRoute,drawMarkers} from './sector-layers.js';
import {createGrid} from './pathfinding.js';
import {planMission} from './mission.js';
import {gridToLatLng,metersBetween,bearing} from './geo.js';
import {SECTOR} from './sector.js';
import {applyRecon} from './fog.js';
const $=id=>document.getElementById(id);
let received,plan,view,routeLayer,hazardLayer,markers,returning=false;
function draw(){
  let grid=createGrid(plan.hazard);
  if(plan.reconnaissance?.enabled)grid=applyRecon(grid,new Set(plan.reconnaissance.revealed));
  const stops=returning?[{...plan.hab,id:'hab'}]:plan.stops.filter(s=>s.selected);
  const result=planMission(grid,plan.current,stops);
  let base=createGrid();if(plan.reconnaissance?.enabled)base=applyRecon(base,new Set(plan.reconnaissance.revealed));
  const before=plan.hazard?planMission(base,plan.current,stops):null;
  routeLayer.clearLayers();drawHazards(hazardLayer,grid,view.renderer);
  if(result){if(before)drawRoute(routeLayer,before.path,{dashed:true,color:'#bac4ca',renderer:view.renderer});drawRoute(routeLayer,result.path,{renderer:view.renderer});}
  drawMarkers(markers,{hab:plan.hab,stops:stops.filter(s=>s.id!=='hab').map(s=>({...s,name:s.id})),current:plan.current,selected:stops.map(()=>true),onSelectHab:()=>{returning=true;draw();}});
  const position=gridToLatLng(SECTOR,plan.current.x,plan.current.y),next=stops[0];
  const dest=next?gridToLatLng(SECTOR,next.x,next.y):position;
  const angle=bearing(position,dest),distance=metersBetween(position,dest);
  $('tablet-status').textContent=!result?'NO ROUTE AVAILABLE':!next?'No remaining stops':result.path.length===1?'Already at destination':`Next: ${next.id}`;
  $('heading').textContent=distance<.01?'At destination':`${angle.toFixed(0)}° bearing · ${distance.toFixed(0)} m straight-line to next stop (DERIVED)`;
  $('heading-arrow').style.transform=`rotate(${angle}deg)`;
  $('tablet-details').textContent=`${position.lat.toFixed(5)} N, ${position.lng.toFixed(5)} E (DERIVED). ${result?result.cost.toFixed(2)+' SIMULATED cost units':'No complete traverse can be drawn.'}`;
  $('tablet-recon').textContent=plan.reconnaissance?.enabled?'SIMULATED RECONNAISSANCE snapshot received; not real obstacle detection.':'Reconnaissance disabled.';
  $('tablet-hazard').textContent=plan.hazard?'Clear simulated dust hazard':'Simulate dust hazard';$('tablet-hazard').setAttribute('aria-pressed',String(plan.hazard));
  window.__tabletTest={plan,result,view,returning};
}
function load(){
  const parsed=parsePlan(location.hash.slice(1));
  $('plan-error').hidden=parsed.ok;$('tablet-content').hidden=!parsed.ok;
  if(!parsed.ok){$('plan-error').textContent=parsed.error;return;}
  received=parsed.plan;plan=structuredClone(received);returning=false;
  if(!view){view=createSectorMap($('tablet-map'),{onTileError:()=>{$('tile-status').textContent='Cached imagery unavailable; local routing remains active.';}});drawGrid(view.map,view.renderer);routeLayer=L.layerGroup().addTo(view.map);hazardLayer=L.layerGroup().addTo(view.map);markers=L.layerGroup().addTo(view.map);}
  view.map.invalidateSize();view.resetView();const position=gridToLatLng(SECTOR,plan.current.x,plan.current.y);view.map.panTo([position.lat,position.lng],{animate:false});draw();
}
$('tablet-hazard').onclick=()=>{plan.hazard=!plan.hazard;draw();};
$('tablet-return').onclick=()=>{returning=true;draw();};
$('tablet-reset').onclick=()=>{plan=structuredClone(received);returning=false;draw();};
window.addEventListener('hashchange',load);load();
