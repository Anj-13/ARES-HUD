import {planMission} from './mission.js';
import {createGrid} from './pathfinding.js';
import {SECTOR} from './sector.js';
export function createSols(){return Array.from({length:8},(_,i)=>({sol:i+1,label:`Sol ${i+1}`,stops:[SECTOR.stops[i%3],SECTOR.stops[(i+1)%3],{...SECTOR.hab,id:'hab',name:'Hab'}],logEntry:`SIMULATED excursion ${i+1}: compare two hypothetical science sites and return to Hab.`}));}
export function buildSol(day,grid=createGrid()){
  const route=planMission(grid,SECTOR.hab,day.stops);if(!route)return null;
  const cumulative=[0];for(let i=1;i<route.path.length;i++){const a=route.path[i-1],b=route.path[i];cumulative.push(cumulative.at(-1)+Math.hypot(b.x-a.x,b.y-a.y)*(1+Math.max(0,grid[b.y][b.x].penalty)));}
  return {...route,cumulative};
}
export function positionAt(route,t){
  if(!route)return null;
  const target=Math.max(0,Math.min(1,t))*route.cost;let index=0;
  while(index<route.path.length-1 && route.cumulative[index+1]<=target+1e-9)index++;
  const a=route.path[index],b=route.path[index+1]||a,span=(route.cumulative[index+1]??target)-route.cumulative[index];
  const fraction=span>0?(target-route.cumulative[index])/span:0;
  const position={x:a.x+(b.x-a.x)*fraction,y:a.y+(b.y-a.y)*fraction};
  return {position,index,cell:{...a},cost:target,trail:[...route.path.slice(0,index+1),...(fraction>0?[position]:[])],future:[position,...route.path.slice(index+1)]};
}
