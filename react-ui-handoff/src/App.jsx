import {useCallback,useState} from 'react';
import {Globe2,Map,TabletSmartphone,BookOpen} from 'lucide-react';
import MissionPanel from './components/MissionPanel.jsx';
import MapPanel from './components/MapPanel.jsx';
import TelemetryPanel from './components/TelemetryPanel.jsx';
import Timeline from './components/Timeline.jsx';
import Modal from './components/Modal.jsx';
import TabletView from './components/TabletView.jsx';
import SourcesView from './components/SourcesView.jsx';
import {INITIAL_STOPS} from './data/demo.js';
export default function App(){
 const [stops,setStops]=useState(INITIAL_STOPS),[selectedId,setSelectedId]=useState('delta'),[view,setView]=useState('map'),[fullscreen,setFullscreen]=useState(false),[dialog,setDialog]=useState(null),[position,setPosition]=useState('Hab'),[hazard,setHazard]=useState(false),[sol,setSol]=useState(1),[playing,setPlaying]=useState(false),[progress,setProgress]=useState(0),[status,setStatus]=useState('UI preview: mission engine not connected.');
 const closeDialog=useCallback(()=>setDialog(null),[]);
 const move=(index,delta)=>setStops(prev=>{const next=[...prev];[next[index],next[index+delta]]=[next[index+delta],next[index]];return next});
 const plan=()=>setStatus('Planning requested. Connect existing pathfinding.js to calculate real metrics.');
 const arrival=()=>{const target=stops.find(s=>s.selected);if(target){setPosition(target.name);setStatus(`Preview arrival at ${target.name}.`)}else setStatus('Select a science stop first.')};
 const reset=()=>{setPosition('Hab');setHazard(false);setSol(1);setPlaying(false);setProgress(0);setStatus('Preview scenario reset.')};
 return <div className="app-shell"><header className="header"><div className="brand"><h1>ARES-HUD / MISSION CONTROL</h1><p>TEAM MARTIAN · EVA PLANNING · PROTOTYPE / v0.2</p></div><nav className="header-actions" aria-label="Display and handoff"><button className={'button '+(view==='globe'?'active':'')} onClick={()=>{setView('globe');setFullscreen(false)}}><Globe2 size={16}/> GLOBE</button><button className={'button '+(view==='map'?'active':'')} onClick={()=>{setView('map');setFullscreen(v=>!v)}}><Map size={16}/> {fullscreen?'EXIT FULLSCREEN':'MAP'}</button><button className="button tablet-button" onClick={()=>setDialog('tablet')}><TabletSmartphone size={16}/> SEND TO TABLET</button></nav></header>
 <div className={'dashboard '+(fullscreen?'dashboard-fullscreen':'')}>
 {!fullscreen&&<MissionPanel stops={stops} onToggle={id=>setStops(prev=>prev.map(s=>s.id===id?{...s,selected:!s.selected}:s))} onMove={move} onPlan={plan} onArrival={arrival} onSelect={setSelectedId} selectedId={selectedId} status={status}/>}
 <MapPanel stops={stops} selectedId={selectedId} onSelect={setSelectedId} position={position} view={view}/>
 {!fullscreen&&<TelemetryPanel position={position} hazard={hazard} onHazard={()=>setHazard(v=>!v)} onReturn={()=>setPosition('Hab')} onReset={reset} metrics={{steps:'—',cost:'—',distance:'—'}}/>}
 {!fullscreen&&<Timeline sol={sol} setSol={setSol} playing={playing} setPlaying={setPlaying} progress={progress} setProgress={setProgress}/>}
 </div><footer className="footer"><div><strong>OBSERVED MAP · SIMULATED EVA</strong><p>Hackathon planning demonstrator. Routes and hazards are simulated, not flight-qualified navigation.</p></div><button className="button sources-button" onClick={()=>setDialog('sources')}><BookOpen size={16}/> SOURCES</button></footer>
 {dialog==='tablet'&&<Modal title="SEND TO TABLET / EVA HANDOFF" onClose={closeDialog}><TabletView stops={stops} position={position} hazard={hazard}/></Modal>}
 {dialog==='sources'&&<Modal title="SOURCES & MISSION NOTES" onClose={closeDialog}><SourcesView/></Modal>}
 </div>
}
