import {parsePlan} from '../domain/plan.js';
import {createMissionStore} from '../state/mission-store.js';

// The payload contains inputs only. A new, isolated store recomputes A* locally.
export function receiveTabletPlan(encoded){
  const parsed=parsePlan(encoded);
  return parsed.ok?{ok:true,store:createMissionStore(parsed.plan)}:parsed;
}
