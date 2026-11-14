// SIMULATED planning knowledge; never observations or obstacle detection.
export function revealTrail(trail, radius=3, existing=new Set()) {
  const revealed=new Set(existing);
  for(const p of trail) for(let y=Math.max(0,Math.ceil(p.y-radius));y<=Math.min(39,Math.floor(p.y+radius));y++)
    for(let x=Math.max(0,Math.ceil(p.x-radius));x<=Math.min(39,Math.floor(p.x+radius));x++)
      if(Math.hypot(x-p.x,y-p.y)<=radius) revealed.add(y*40+x);
  return revealed;
}
export function applyRecon(grid,revealed,penalty=0.5) {
  return grid.map((row,y)=>row.map((cell,x)=>({...cell,penalty:cell.penalty+(revealed.has(y*40+x)?0:penalty)})));
}
