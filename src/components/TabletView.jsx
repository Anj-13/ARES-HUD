import {useMemo,useState} from 'react';
import {TabletSmartphone,Navigation} from 'lucide-react';
import {receiveTabletPlan} from '../integrations/tablet-bridge.js';
import {useMission} from '../integrations/use-mission.js';
import MapPanel from './MapPanel.jsx';

const disclaimer='Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.';

function ConnectedTablet({store,encoded,standalone}){
 const s=useMission(store),a=store.actions,[copy,setCopy]=useState('');
 const url=new URL(import.meta.env.BASE_URL+'tablet.html',location.href);
 url.hash=encoded;

 const copyPlan=async()=>{
   try{
     await navigator.clipboard.writeText(url.href);
     setCopy('Plan URL copied.');
   }catch{
     setCopy('Copy unavailable in this browser. Open the tablet and copy its address from the address bar.');
   }
 };

 return <div className="tablet-content">
   <div className="tablet-device">
     <div className="tablet-status"><TabletSmartphone size={17}/> EVA WRIST TABLET <span>SIMULATED</span></div>
     <div className="tablet-section">
       <div className="section-label">CURRENT POSITION</div><h3>{s.position}</h3>
       <p>Validated input snapshot · independently recomputed JavaScript A*</p>
     </div>
     <MapPanel state={s} actions={a} compact/>
     <div className="tablet-section">
       <div className="section-label"><Navigation size={14}/> ORDERED SCIENCE STOPS</div>
       {s.targets.map((stop,i)=><div className="tablet-stop" key={stop.id}><b>{i+1}</b><span>{stop.name}</span></div>)}
       <p role="status">{s.status}</p><p>{s.heading}</p>
       <p>{s.metrics.steps} steps · {s.metrics.cost} SIMULATED cost · {s.metrics.distance} m DERIVED trail</p>
     </div>
     <div className="tablet-section">
       <button className="button full" aria-pressed={s.hazard} onClick={a.hazard}>{s.hazard?'Clear simulated dust hazard':'Simulate dust hazard'}</button>
       <button className="button full" onClick={a.returnHome}>Return to Hab</button>
       <button className="button full" onClick={a.reset}>Reset received plan</button>
       <p>{s.scenario}</p><p>{s.recon?'SIMULATED RECONNAISSANCE snapshot; not real obstacle detection.':'Reconnaissance disabled.'}</p>
     </div>
     <p className="small">OBSERVED NASA imagery · DERIVED coordinates · HYPOTHETICAL mission</p>
     <p className="small">{disclaimer}</p>
   </div>
   {!standalone&&<>
     <div className="tablet-actions">
       <a className="button" href={url.href} target="_blank" rel="noopener noreferrer">Open independent tablet in another window</a>
       <button className="button" onClick={copyPlan}>Copy plan URL</button>
     </div>
     <p role="status">{copy}</p>
     <p className="tiny muted">A phone needs a reachable hosted URL; localhost points to that phone. Snapshot only; no server sync. QR deferred.</p>
   </>}
   {standalone&&<div className="tablet-actions"><a className="button" href={import.meta.env.BASE_URL}>Open mission control</a></div>}
 </div>;
}

export default function TabletView({encoded,standalone=false}){
 const received=useMemo(()=>receiveTabletPlan(encoded),[encoded]);
 return received.ok?<><p className="tablet-warning" role="note">{disclaimer}</p><ConnectedTablet key={encoded} store={received.store} encoded={encoded} standalone={standalone}/></>:<><p role="alert">{received.error}</p><p>{disclaimer}</p></>;
}
