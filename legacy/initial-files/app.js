import {createGrid,findPath,HAB,SCIENCE} from './pathfinding.js';
const $ = id => document.getElementById(id);
let hazard=false, current=HAB, goal=SCIENCE;
function draw() {
  const grid=createGrid(hazard), result=findPath(grid,current,goal);
  const before=hazard ? findPath(createGrid(),current,goal) : null;
  const svg=$('map'); svg.replaceChildren();
  function shape(tag,attrs,text) {
    const node=document.createElementNS('http://www.w3.org/2000/svg',tag);
    for(const [key,value] of Object.entries(attrs)) node.setAttribute(key,value);
    if(text) node.textContent=text;
    svg.append(node); return node;
  }
  grid.forEach((row,y)=>row.forEach((cell,x)=>shape('rect',{x:x*10,y:y*10,width:10,height:10,fill:cell.hazard?'#a85132':cell.penalty?'#293638':'#15232b',stroke:'#34434b','stroke-width':.35})));
  const route=(r,color,dash)=>{if(r) shape('polyline',{points:r.path.map(p=>`${p.x*10+5},${p.y*10+5}`).join(' '),fill:'none',stroke:color,'stroke-width':2.5,'stroke-dasharray':dash});};
  route(before,'#bac4ca','4 4'); route(result,'#79e9cc','none');
  shape('rect',{x:HAB.x*10-2,y:HAB.y*10-2,width:14,height:14,fill:'#bce6f7'});
  shape('text',{x:60,y:193,fill:'#eaf4fa','font-size':11},'H / HAB');
  shape('circle',{cx:current.x*10+5,cy:current.y*10+5,r:4,fill:'#fff',stroke:'#0c1116','stroke-width':2});
  $('status').textContent=!result?'No route available':result.path.length===1?'Already at destination':`Route to ${goal===HAB?'Hab':'science waypoint'}`;
  $('details').textContent=result?`${result.path.length-1} grid steps · ${result.cost.toFixed(2)} simulated cost units`:'Selected position or destination is blocked, or no traversable connection exists.';
  $('scenario').textContent=hazard?'SIMULATED HAZARD active. Dashed line shows the route before the dust zone; solid line shows the recomputed route.':'Dust scenario clear. Select “Simulate dust hazard” to block a fixed region across the outbound route.';
  $('hazard').setAttribute('aria-pressed',String(hazard));
  $('hazard').textContent=hazard?'Clear simulated dust hazard':'Simulate dust hazard';
}
function science(){goal=SCIENCE;draw();}
$('science').onclick=science; $('science-pin').onclick=science;
$('hazard').onclick=()=>{hazard=!hazard;draw();};
$('position').onchange=()=>{current=$('position').value==='hab'?HAB:SCIENCE;draw();};
$('return').onclick=()=>{goal=HAB;draw();};
$('reset').onclick=()=>{hazard=false;current=HAB;goal=SCIENCE;$('position').value='hab';draw();};
draw();
