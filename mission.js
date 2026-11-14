import {findPath} from './pathfinding.js';
export function planMission(grid,start,stops){
  let from=start,cost=0,path=[start]; const segments=[];
  for(const stop of stops){const route=findPath(grid,from,stop);if(!route)return null;segments.push(route);cost+=route.cost;path.push(...route.path.slice(1));from=stop;}
  return {path,cost,segments};
}
export function moveStop(stops,index,offset){const result=[...stops],next=index+offset;if(next>=0&&next<result.length)[result[index],result[next]]=[result[next],result[index]];return result;}
export function layerState(state,id,visible){return {...state,[id]:Boolean(visible)};}
