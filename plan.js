import { SECTOR } from './sector.js';
const MAX_LENGTH = 24000;
const point = p => p && Number.isInteger(p.x) && Number.isInteger(p.y) && p.x >= 0 && p.x < 40 && p.y >= 0 && p.y < 40;
export function checksum(value) {
  let hash = 2166136261;
  for (const byte of new TextEncoder().encode(JSON.stringify(value))) hash = Math.imul(hash ^ byte, 16777619);
  return (hash >>> 0).toString(16).padStart(8, '0');
}
function payload(p) {
  return { schemaVersion:p.schemaVersion, sectorId:p.sectorId, hab:p.hab, current:p.current,
    stops:p.stops, hazard:p.hazard, sol:p.sol, labels:p.labels,
    ...(p.reconnaissance ? { reconnaissance:p.reconnaissance } : {}) };
}
export function validatePlan(p) {
  if (!p || p.schemaVersion !== 1 || p.sectorId !== SECTOR.id) throw Error('Unsupported plan version or sector.');
  if (!point(p.hab) || !point(p.current)) throw Error('Invalid Hab or current grid position.');
  if (!Array.isArray(p.stops) || p.stops.length > 20 || p.stops.some(s => !point(s) || typeof s.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(s.id) || typeof s.selected !== 'boolean')) throw Error('Invalid science stops.');
  if (new Set(p.stops.map(s=>s.id)).size !== p.stops.length) throw Error('Duplicate stop identifiers.');
  if (typeof p.hazard !== 'boolean' || !Number.isInteger(p.sol) || p.sol < 1 || p.sol > 8) throw Error('Invalid scenario.');
  if (p.labels?.hab !== 'HYPOTHETICAL' || p.labels?.costs !== 'SIMULATED') throw Error('Missing scientific labels.');
  if (p.reconnaissance) {
    const r=p.reconnaissance;
    if (typeof r.enabled !== 'boolean' || r.penalty !== 0.5 || !Array.isArray(r.revealed) || r.revealed.length > 1600 || r.revealed.some(n=>!Number.isInteger(n)||n<0||n>=1600)) throw Error('Invalid reconnaissance snapshot.');
  }
  if (p.checksum !== checksum(payload(p))) throw Error('Plan integrity check failed.');
  return p;
}
export function makePlan(state) {
  const p = {schemaVersion:1, sectorId:SECTOR.id, hab:{...SECTOR.hab}, current:{x:state.current.x,y:state.current.y},
    stops:state.stops.map((s,i)=>({id:s.id || `stop-${i}`,x:s.x,y:s.y,selected:s.selected !== false})),
    hazard:Boolean(state.hazard), sol:state.sol || 1, labels:{hab:'HYPOTHETICAL',costs:'SIMULATED'},
    ...(state.reconnaissance ? {reconnaissance:structuredClone(state.reconnaissance)} : {})};
  p.checksum=checksum(payload(p)); return validatePlan(p);
}
export function serializePlan(plan) {
  validatePlan(plan);
  const bytes=new TextEncoder().encode(JSON.stringify(plan));
  const encoded=btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
  if(encoded.length>MAX_LENGTH) throw Error('Plan is too large.');
  return encoded;
}
export function parsePlan(text) {
  try {
    if(typeof text !== 'string' || text.length>MAX_LENGTH || !/^[A-Za-z0-9_-]+$/.test(text)) throw Error('Invalid or oversized plan link.');
    const bytes=Uint8Array.from(atob(text.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));
    const plan=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
    validatePlan(plan);return {ok:true,plan};
  } catch(error) {return {ok:false,error:error.message};}
}
