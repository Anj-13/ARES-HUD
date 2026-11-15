import {useCallback,useEffect,useState} from 'react';
import {Globe2,Map,TabletSmartphone,BookOpen} from 'lucide-react';
import MissionPanel from './components/MissionPanel.jsx';
import MapPanel from './components/MapPanel.jsx';
import TelemetryPanel from './components/TelemetryPanel.jsx';
import Timeline from './components/Timeline.jsx';
import Modal from './components/Modal.jsx';
import TabletView from './components/TabletView.jsx';
import SourcesView from './components/SourcesView.jsx';
import {createMissionStore} from './state/mission-store.js';
import {useMission} from './integrations/use-mission.js';
export const DISCLAIMER='Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.';
export default function App(){
 const [store]=useState(()=>createMissionStore()),state=useMission(store),a=store.actions;
 const [view,setView]=useState('map'),[fullscreen,setFullscreen]=useState(false),[dialog,setDialog]=useState(null),[payload,setPayload]=useState(''),[error,setError]=useState('');
 const closeDialog=useCallback(()=>setDialog(null),[]);
 useEffect(()=>{if(import.meta.env.DEV){window.__aresMission=store;return()=>{delete window.__aresMission;};}},[store]);
 const handoff=()=>{try{a.playing(false);setPayload(store.handoff());setDialog('tablet');setError('');}catch(e){setError(e.message);}};
 return <div className="app-shell"><header className="header"><div className="brand"><h1>ARES-HUD / MISSION CONTROL</h1><p>TEAM MARTIAN · EVA PLANNING · PROTOTYPE / v0.3</p></div><nav className="header-actions" aria-label="Display and handoff"><button className={'button '+(view==='globe'?'active':'')} aria-pressed={view==='globe'} onClick={()=>{setView('globe');setFullscreen(false)}}><Globe2 size={16}/> GLOBE</button><button className={'button '+(view==='map'?'active':'')} aria-pressed={fullscreen} onClick={()=>{if(view==='globe'){setView('map');return;}setFullscreen(v=>!v)}}><Map size={16}/> {fullscreen?'EXIT FULLSCREEN':'MAP'}</button><button className="button tablet-button" onClick={handoff}><TabletSmartphone size={16}/> SEND TO TABLET</button></nav></header>
 {error&&<p role="alert">{error}</p>}<div className={'dashboard '+(fullscreen?'dashboard-fullscreen':'')}>
 {!fullscreen&&<MissionPanel stops={state.stops} onToggle={a.toggle} onMove={a.move} onPlan={a.plan} onArrival={a.arrive} onSelect={a.select} selectedId={state.selectedId} status={state.status} result={state.result} targets={state.targets}/>}
 <MapPanel onExplore={()=>{setView('map');requestAnimationFrame(()=>document.querySelector('#mars-map')?.focus());}} state={state} actions={a} view={view} fullscreen={fullscreen}/>
 {!fullscreen&&<TelemetryPanel position={state.position} positionChoice={state.positionChoice} onPosition={a.position} hazard={state.hazard} onHazard={a.hazard} onReturn={a.returnHome} onReset={a.reset} metrics={state.metrics} status={state.status} scenario={state.scenario}/>}
 {!fullscreen&&<Timeline state={state} actions={a}/>}
 </div><footer className="footer"><div><strong>OBSERVED MAP · SIMULATED EVA</strong><p>{DISCLAIMER}</p></div><button className="button sources-button" onClick={()=>setDialog('sources')}><BookOpen size={16}/> SOURCES</button></footer>
 {dialog==='tablet'&&<Modal title="SEND TO TABLET / EVA HANDOFF" onClose={closeDialog}><TabletView encoded={payload}/></Modal>}
 {dialog==='sources'&&<Modal title="SOURCES & MISSION NOTES" onClose={closeDialog}><SourcesView/></Modal>}
 </div>;
}
