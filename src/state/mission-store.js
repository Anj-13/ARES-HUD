import {createGrid} from '../domain/pathfinding.js';
import {planMission, moveStop} from '../domain/mission.js';
import {SECTOR} from '../domain/sector.js';
import {gridToLatLng, metersBetween, bearing} from '../domain/geo.js';
import {createSols, buildSol, positionAt} from '../domain/sols.js';
import {revealTrail, applyRecon} from '../domain/fog.js';
import {makePlan, serializePlan} from '../domain/plan.js';

export const days = createSols();
export const trailMetres = path => path.slice(1).reduce((n,p,i)=>n+metersBetween(gridToLatLng(SECTOR,path[i].x,path[i].y),gridToLatLng(SECTOR,p.x,p.y)),0);
const same = (a,b) => a && b && a.path.length===b.path.length && a.path.every((p,i)=>p.x===b.path[i].x && p.y===b.path[i].y);

/** Authoritative mission inputs. All routes/metrics are derived by the original engines. */
export function createMissionStore(received = null) {
  const initial = () => ({
    current:{...(received?.current || SECTOR.hab)},
    stops:(received?.stops || SECTOR.stops).map(s=>({...s,name:s.name || SECTOR.stops.find(p=>p.id===s.id)?.name || s.id,selected:s.selected!==false})),
    selectedId:SECTOR.stops[0].id, goal:{...SECTOR.stops[0]}, mission:Boolean(received),
    hazard:received?.hazard || false, sol:received?.sol || 1, progress:0,
    timeline:false, playing:false, speed:1, recon:received?.reconnaissance?.enabled || false,
    known:new Set(received?.reconnaissance?.revealed || revealTrail([received?.current || SECTOR.hab])),
    override:null
  });
  let state=initial(), snapshot, cachedKey='', cachedSol;
  const listeners=new Set();
  function derive() {
    const gridFor = (hazard,known=state.known) => {
      const grid=createGrid(hazard);
      const result=state.recon?applyRecon(grid,known):grid;
      return state.override?state.override(result):result;
    };
    let current=state.current, targets=state.mission?state.stops.filter(s=>s.selected):[state.goal], sample=null, log='';
    if(state.timeline){
      const day=days[state.sol-1], key=`${state.sol}/${state.hazard}/${state.recon}`;
      if(key!==cachedKey || state.override){cachedKey=key;cachedSol=buildSol(day,gridFor(state.hazard,revealTrail([SECTOR.hab])));}
      sample=positionAt(cachedSol,state.progress/100);
      if(sample){
        current=sample.cell;state.known=revealTrail(sample.trail);
        let end=0;
        targets=day.stops.filter((s,i)=>{end+=cachedSol.segments[i].path.length-1;return end>sample.index;}).map(s=>({...s,selected:true}));
      }else targets=[];
      log=day.logEntry;
    }
    const grid=gridFor(state.hazard), result=state.timeline&&!sample?null:planMission(grid,current,targets);
    const before=state.hazard?planMission(gridFor(false),current,targets):null;
    const displayed=sample?.position || current;
    const ll=gridToLatLng(SECTOR,displayed.x,displayed.y), hab=gridToLatLng(SECTOR,SECTOR.hab.x,SECTOR.hab.y);
    const home=planMission(grid,current,[SECTOR.hab]);
    const next=targets[0], dest=next?gridToLatLng(SECTOR,next.x,next.y):ll;
    const status=!result?'No route available':result.path.length===1?'Already at destination':state.timeline?`SIMULATED Sol ${state.sol}`:state.mission?'Science traverse planned':state.goal.id==='hab'?'Route to Hab':'Route to science waypoint';
    const scenario=!state.hazard?'Dust scenario clear. Simulate dust to block a fixed region and recalculate.':!result?'SIMULATED HAZARD: no complete route exists.':!targets.length?'SIMULATED HAZARD: no stops selected.':result.path.length===1?'SIMULATED HAZARD: identical endpoints need no detour.':same(result,before)?'SIMULATED HAZARD: recomputed route unchanged; no detour needed.':'SIMULATED HAZARD: dashed route is before dust; solid route is the recomputed detour.';
    snapshot={...state,current,targets,sample,grid,result,before,status,scenario,log,displayed,
      positionChoice:state.current.x===SECTOR.hab.x&&state.current.y===SECTOR.hab.y?'hab':state.current.x===SECTOR.stops[0].x&&state.current.y===SECTOR.stops[0].y?'science':'arrival',
      position:displayed.x===SECTOR.hab.x&&displayed.y===SECTOR.hab.y?'Hab':`${ll.lat.toFixed(5)} N, ${ll.lng.toFixed(5)} E (DERIVED)`,
      metrics:{steps:result?result.path.length-1:'—',cost:result?result.cost.toFixed(2):'—',distance:result?trailMetres(result.path).toFixed(0):'—'},
      timelineInfo:sample?`Traveled ${trailMetres(sample.trail).toFixed(0)} m; Hab ${metersBetween(ll,hab).toFixed(0)} m straight / ${home?trailMetres(home.path).toFixed(0)+' m route':'no route'}. Elapsed ${sample.cost.toFixed(2)} simulated cost; next ${next?.name || 'Hab / complete'}.`:'',
      heading:metersBetween(ll,dest)<.01?'At destination':`${bearing(ll,dest).toFixed(0)}° bearing · ${metersBetween(ll,dest).toFixed(0)} m straight-line (DERIVED)`};
  }
  function emit(){derive();listeners.forEach(fn=>fn());}
  function leave(){state.timeline=false;state.playing=false;}
  const actions={
    select(id){leave();const stop=state.stops.find(s=>s.id===id);state.selectedId=id;state.goal=id==='hab'?{...SECTOR.hab,id:'hab',name:'Hab'}:{...(stop || SECTOR.stops[0])};state.mission=false;emit();},
    toggle(id){leave();state.stops=state.stops.map(s=>s.id===id?{...s,selected:!s.selected}:s);emit();},
    move(i,offset){leave();state.stops=moveStop(state.stops,i,offset);emit();},
    plan(){leave();state.mission=true;emit();},
    position(choice){leave();const p=choice==='science'?SECTOR.stops[0]:SECTOR.hab;state.current={x:p.x,y:p.y};state.known=revealTrail([state.current],3,state.known);emit();},
    arrive(){leave();const next=state.stops.find(s=>s.selected);if(next&&planMission(snapshot.grid,state.current,[next])){state.current={x:next.x,y:next.y};state.stops=state.stops.map(s=>s.id===next.id?{...s,selected:false}:s);state.mission=true;state.known=revealTrail([state.current],3,state.known);}emit();},
    hazard(){leave();state.hazard=!state.hazard;emit();},
    returnHome(){actions.select('hab');},
    reset(){state=initial();cachedKey='';emit();},
    sol(value){state.sol=value;state.progress=0;state.timeline=true;state.playing=false;emit();},
    progress(value){state.progress=value;state.timeline=true;state.playing=false;emit();},
    playing(value){state.playing=typeof value==='function'?value(state.playing):value;if(state.playing)state.timeline=true;emit();},
    speed(value){state.speed=value;emit();},
    tick(){if(!state.playing)return;state.progress+=.5*state.speed;if(state.progress>100){if(state.sol===8){state.progress=100;state.playing=false;}else{state.sol++;state.progress=0;}}emit();},
    exit(){leave();emit();},
    recon(value){state.recon=value;state.known=revealTrail([state.current]);emit();},
    override(fn){state.override=fn;cachedKey='';emit();}
  };
  derive();
  return {getSnapshot:()=>snapshot,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);},actions,
    handoff(){const p=makePlan({current:snapshot.current,stops:snapshot.targets.map((s,i)=>({...s,id:s.id||`destination-${i}`,selected:true})),hazard:state.hazard,sol:state.sol,reconnaissance:{enabled:state.recon,penalty:.5,revealed:[...state.known].sort((a,b)=>a-b)}});return serializePlan(p);}};
}
