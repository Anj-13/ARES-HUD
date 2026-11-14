import {makePlan,serializePlan} from './plan.js';
import {createSols,buildSol,positionAt} from './sols.js';
import {revealTrail,applyRecon} from './fog.js';
import {createGrid} from './pathfinding.js';
import {planMission} from './mission.js';
import {SECTOR} from './sector.js';
import {gridToLatLng,gridCornerToLatLng,metersBetween} from './geo.js';
import {drawRoute} from './sector-layers.js';

export function mountMissionControls({view,state,draw,getTargets,baseLayers}){
  const $=id=>document.getElementById(id),days=createSols();
  const timelineLayer=L.layerGroup().addTo(view.map),reconLayer=L.layerGroup().addTo(view.map);
  let active=false,snapshot=null,timer=null,known=revealTrail([SECTOR.hab]),baseRoute=null,baseKey='';
  const length=path=>path.slice(1).reduce((n,b,i)=>n+metersBetween(gridToLatLng(SECTOR,path[i].x,path[i].y),gridToLatLng(SECTOR,b.x,b.y)),0);
  function stop(){clearInterval(timer);timer=null;$('sol-play').textContent='Play';$('sol-play').setAttribute('aria-pressed','false');}
  function paintRecon(){
    reconLayer.clearLayers();if(!$('recon').checked)return;
    // Outlines only: zero fill. Real orbital pixels are never covered by a fog mask.
    for(let y=0;y<40;y++)for(let x=0;x<40;x++)if(!known.has(y*40+x)){
      const a=gridCornerToLatLng(SECTOR,x,y),b=gridCornerToLatLng(SECTOR,x+1,y+1);
      L.rectangle([[a.lat,a.lng],[b.lat,b.lng]],{pane:'fog',interactive:false,fill:false,color:'#e1b475',weight:.7,dashArray:'2 4'}).addTo(reconLayer);
    }
    $('recon-status').textContent=`SIMULATED RECONNAISSANCE — not real obstacle detection. ${known.size}/1600 cells revealed; radius 3 cells (~300 m assumed), unknown-cell penalty 0.5. Outlines mark unknown planning cells; imagery stays observed.`;
  }
  function reconSnapshot(){return {enabled:$('recon').checked,penalty:.5,revealed:[...known].sort((a,b)=>a-b)};}
  function grid(hazard=state.hazard){const base=createGrid(hazard);return $('recon').checked?applyRecon(base,known):base;}
  function leave(){if(active){baseLayers.routeLayer.addTo(view.map);if($('markers-visible').checked)baseLayers.markerLayer.addTo(view.map);}active=false;snapshot=null;timelineLayer.clearLayers();stop();$('sol-status').textContent='Timeline paused. Use the scrubber to preview a simulated Sol.';}
  function preview(){
    active=true;baseLayers.routeLayer.remove();baseLayers.markerLayer.remove();const day=days[Number($('sol').value)-1],progress=Number($('sol-progress').value)/1000;
    const key=`${day.sol}/${state.hazard}/${$('recon').checked}`;
    if(key!==baseKey){baseKey=key;let g=createGrid(state.hazard);if($('recon').checked)g=applyRecon(g,revealTrail([SECTOR.hab]));baseRoute=buildSol(day,g);}
    const sample=positionAt(baseRoute,progress);timelineLayer.clearLayers();
    if(!sample){$('sol-status').textContent='SIMULATED Sol: no route available.';snapshot=null;return;}
    known=revealTrail(sample.trail);paintRecon();
    let endpoint=0;const remaining=day.stops.filter((s,i)=>{endpoint+=baseRoute.segments[i].path.length-1;return endpoint>sample.index;});
    const remainingRoute=planMission(grid(),sample.cell,remaining);
    drawRoute(timelineLayer,sample.trail,{renderer:view.renderer,color:'#ffd38a'});
    drawRoute(timelineLayer,$('recon').checked?(remainingRoute?.path||[]):sample.future,{renderer:view.renderer,dashed:true,color:'#8eece0'});
    const ll=gridToLatLng(SECTOR,sample.position.x,sample.position.y),hab=gridToLatLng(SECTOR,SECTOR.hab.x,SECTOR.hab.y);
    const marker=L.circleMarker([ll.lat,ll.lng],{pane:'markers',radius:7,color:'#fff',fillColor:'#e6bc83',fillOpacity:1}).addTo(timelineLayer);
    marker.setStyle({opacity:$('markers-visible').checked?1:0,fillOpacity:$('markers-visible').checked?1:0});
    const home=planMission(grid(),sample.cell,[SECTOR.hab]);
    $('sol-status').textContent=`SIMULATED Sol ${day.sol} · ${(progress*100).toFixed(1)}% modeled cost progress. DERIVED ${ll.lat.toFixed(5)} N, ${ll.lng.toFixed(5)} E. Traveled ${length(sample.trail).toFixed(0)} m; Hab ${metersBetween(ll,hab).toFixed(0)} m straight-line / ${home?length(home.path).toFixed(0)+' m route from reached cell':'no route'}. Cost elapsed ${sample.cost.toFixed(2)}; remaining ${remainingRoute?remainingRoute.cost.toFixed(2):'unavailable'} (SIMULATED). Next: ${remaining[0]?.name||'Hab / excursion complete'}.`;
    $('sol-log').textContent=day.logEntry+($('recon').checked?` Reconnaissance revealed ${known.size} cells; remaining route updated.`:'');
    for(const item of $('sol-mission-log').children){const current=Number(item.dataset.sol)===day.sol;item.classList.toggle('current-sol',current);if(current)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');}
    snapshot={current:sample.cell,stops:remaining.map(s=>({...s,selected:true})),hazard:state.hazard,sol:day.sol,reconnaissance:reconSnapshot()};
    window.__missionFeatures.sample=sample;
    window.__missionFeatures.marker=marker;
    window.__missionFeatures.remainingRoute=remainingRoute;
  }
  days.forEach(day=>{const option=document.createElement('option');option.value=day.sol;option.textContent=day.label;$('sol').append(option);const item=document.createElement('li');item.dataset.sol=day.sol;item.textContent=`${day.label}: ${day.logEntry}`;$('sol-mission-log').append(item);});
  $('sol').onchange=()=>{stop();$('sol-progress').value=0;preview();};
  $('sol-progress').oninput=()=>{stop();preview();};
  $('sol-play').onclick=()=>{
    if(timer){stop();return;}
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){$('sol-progress').value=Math.min(1000,Number($('sol-progress').value)+50);preview();return;}
    $('sol-play').textContent='Pause';$('sol-play').setAttribute('aria-pressed','true');
    timer=setInterval(()=>{let t=Number($('sol-progress').value)+5*Number($('sol-speed').value);if(t>1000){if(Number($('sol').value)===8){stop();return;}$('sol').value=Number($('sol').value)+1;t=0;}$('sol-progress').value=t;preview();},100);
  };
  $('sol-progress').onkeydown=e=>{if(e.code==='Space'){e.preventDefault();$('sol-play').click();}};
  $('sol-exit').onclick=()=>{leave();draw();};
  $('recon').onchange=()=>{if(active)preview();else{known=revealTrail([state.current]);paintRecon();draw();}$('recon-status').hidden=!$('recon').checked;};
  $('send-tablet').onclick=()=>{
    stop();
    try{
      const transfer=snapshot||{current:state.current,stops:getTargets().map((s,i)=>({...s,id:s.id||SECTOR.stops.find(p=>p.x===s.x&&p.y===s.y)?.id||(s.x===SECTOR.hab.x&&s.y===SECTOR.hab.y?'hab':`destination-${i}`),selected:true})),hazard:state.hazard,sol:1,reconnaissance:reconSnapshot()};
      const plan=makePlan(transfer),url=new URL('tablet.html',location.href);url.hash=serializePlan(plan);
      $('tablet-link').href=url.href;$('tablet-url').value=url.href;$('tablet-frame').src=url.href;
      $('tablet-dialog').showModal();window.__missionFeatures.sentPlan=plan;
    }catch(error){$('handoff-status').textContent=error.message;}
  };
  $('close-tablet').onclick=()=>{$('tablet-dialog').close();$('send-tablet').focus();};
  $('copy-tablet').onclick=async()=>{try{await navigator.clipboard.writeText($('tablet-url').value);$('copy-status').textContent='Plan URL copied.';}catch{$('tablet-url').select();$('copy-status').textContent='Select and copy the plan URL.';}};
  window.__missionFeatures={preview,get active(){return active;},get known(){return known;},getSnapshot:()=>snapshot};
  return {grid,leave,preview,get active(){return active;},resetKnowledge(){known=revealTrail([SECTOR.hab]);paintRecon();},reveal(position){known=revealTrail([position],3,known);paintRecon();},reconSnapshot};
}
