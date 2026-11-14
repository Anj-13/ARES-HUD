export const SIZE = 40;
export const HAB = {x:5,y:20};
export const SCIENCE = {x:34,y:20};
export function createGrid(hazard = false) {
  return Array.from({length:SIZE}, (_,y) => Array.from({length:SIZE}, (_,x) => ({
    penalty: y < 8 || y > 32 ? 0.8 : 0,
    blocked: hazard && x >= 18 && x <= 22 && y >= 12 && y <= 28,
    hazard: hazard && x >= 18 && x <= 22 && y >= 12 && y <= 28
  })));
}
export function findPath(grid, start, goal) {
  const valid = p => p && Number.isInteger(p.x) && Number.isInteger(p.y) && grid[p.y]?.[p.x] && !grid[p.y][p.x].blocked;
  if (!valid(start) || !valid(goal)) return null;
  const key = p => `${p.x},${p.y}`;
  const heuristic = p => Math.hypot(p.x-goal.x,p.y-goal.y);
  const open = [{...start,g:0,f:heuristic(start),order:0}];
  const scores = new Map([[key(start),0]]), parents = new Map();
  let order = 1;
  while (open.length) {
    open.sort((a,b) => a.f-b.f || a.order-b.order);
    const current = open.shift(), id = key(current);
    if (current.g !== scores.get(id)) continue;
    if (id === key(goal)) {
      const path = [{x:current.x,y:current.y}];
      let parent = parents.get(id);
      while(parent) { path.push(parent); parent = parents.get(key(parent)); }
      return {path:path.reverse(),cost:current.g};
    }
    for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) {
      if(!dx && !dy) continue;
      const next = {x:current.x+dx,y:current.y+dy};
      if(!valid(next)) continue;
      if(dx && dy && (!valid({x:current.x+dx,y:current.y}) || !valid({x:current.x,y:current.y+dy}))) continue;
      const g = current.g + Math.hypot(dx,dy)*(1+Math.max(0,grid[next.y][next.x].penalty || 0));
      if(g < (scores.get(key(next)) ?? Infinity)) {
        scores.set(key(next),g); parents.set(key(next),{x:current.x,y:current.y});
        open.push({...next,g,f:g+heuristic(next),order:order++});
      }
    }
  }
  return null;
}
