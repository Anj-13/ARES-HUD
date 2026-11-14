import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createMissionStore,trailMetres} from '../src/state/mission-store.js';
import {receiveTabletPlan} from '../src/integrations/tablet-bridge.js';
import {createGrid} from '../src/domain/pathfinding.js';
import {planMission} from '../src/domain/mission.js';
import {SECTOR} from '../src/domain/sector.js';
import {parsePlan} from '../src/domain/plan.js';

test('adapter selection, ordering, mission metrics and arrival use original routing',()=>{
 const store=createMissionStore(),a=store.actions;
 a.toggle('channel-mouth');a.move(2,-1);a.plan();
 const s=store.getSnapshot(),expected=planMission(createGrid(),SECTOR.hab,s.targets);
 assert.deepEqual(s.targets.map(s=>s.id),['delta-front','distal-lobe']);
 assert.deepEqual(s.result,expected);assert.equal(s.metrics.cost,expected.cost.toFixed(2));
 assert.equal(s.metrics.distance,trailMetres(expected.path).toFixed(0));
 a.arrive();assert.deepEqual(store.getSnapshot().current,{x:23,y:14});
 assert.equal(store.getSnapshot().stops.find(s=>s.id==='delta-front').selected,false);
 a.returnHome();assert.deepEqual(store.getSnapshot().result.path.at(-1),SECTOR.hab);
 a.reset();assert.deepEqual(store.getSnapshot().current,SECTOR.hab);assert.ok(store.getSnapshot().stops.every(s=>s.selected));
});
test('dust recomputes a detour and impossible routes cannot simulate arrival',()=>{
 const store=createMissionStore(),a=store.actions;
 const clear=store.getSnapshot().result;a.hazard();const dusty=store.getSnapshot();
 assert.ok(dusty.result.cost>clear.cost);assert.deepEqual(dusty.before,clear);
 assert.ok(dusty.result.path.every(p=>!dusty.grid[p.y][p.x].blocked));
 a.override(grid=>grid.map(row=>row.map(cell=>({...cell,blocked:true}))));
 assert.equal(store.getSnapshot().result,null);assert.equal(store.getSnapshot().metrics.cost,'—');
 a.arrive();assert.deepEqual(store.getSnapshot().current,SECTOR.hab);
});
test('handoff validates inputs and isolated tablet recomputes, hazards/return/reset stay local',()=>{
 const desktop=createMissionStore();desktop.actions.plan();desktop.actions.arrive();
 const encoded=desktop.handoff(),tablet=receiveTabletPlan(encoded);
 assert.equal(tablet.ok,true);assert.deepEqual(tablet.store.getSnapshot().result,desktop.getSnapshot().result);
 assert.equal(parsePlan(encoded).plan.current.x,23);
 const baseline=tablet.store.getSnapshot().result;
 tablet.store.actions.hazard();assert.equal(desktop.getSnapshot().hazard,false);
 tablet.store.actions.returnHome();assert.deepEqual(tablet.store.getSnapshot().result.path.at(-1),SECTOR.hab);
 tablet.store.actions.reset();assert.deepEqual(tablet.store.getSnapshot().result,baseline);
 assert.equal(receiveTabletPlan('bad!').ok,false);
});
test('eight Sol scrubs and recon handoff preserve reached-cell independent calculations',()=>{
 const desktop=createMissionStore(),a=desktop.actions;
 a.recon(true);a.sol(3);a.progress(50);
 let s=desktop.getSnapshot();assert.ok(s.sample);assert.equal(s.sample.cost>0,true);
 const transferred=receiveTabletPlan(desktop.handoff()).store.getSnapshot();
 assert.deepEqual(transferred.current,s.sample.cell);assert.deepEqual(transferred.result,s.result);
 a.sol(8);a.progress(100);s=desktop.getSnapshot();assert.deepEqual(s.sample.cell,SECTOR.hab);
 a.playing(true);a.tick();assert.equal(desktop.getSnapshot().playing,false);
 a.exit();assert.equal(desktop.getSnapshot().timeline,false);
});
test('subscribers clean up and paused handoff never activates timeline',()=>{
 const store=createMissionStore();let calls=0;const off=store.subscribe(()=>calls++);
 store.actions.arrive();store.actions.playing(false);
 assert.equal(store.getSnapshot().timeline,false);assert.equal(parsePlan(store.handoff()).plan.current.x,23);
 off();store.actions.reset();assert.equal(calls,2);
});
test('all 24 migrated NASA tiles retain original manifest bytes and SHA-256',()=>{
 const manifest=JSON.parse(readFileSync('public/assets/trek/manifest.json'));
 assert.equal(manifest.length,24);
 for(const item of manifest){const bytes=readFileSync('public/'+item.file);assert.equal(bytes.length,item.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);}
});
