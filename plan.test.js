import test from 'node:test';import assert from 'node:assert/strict';
import {makePlan,parsePlan,serializePlan,checksum} from './plan.js';import {SECTOR} from './sector.js';
const sample=()=>makePlan({current:SECTOR.hab,stops:SECTOR.stops,hazard:false});
const encode=p=>Buffer.from(JSON.stringify(p)).toString('base64url');
test('plan round-trip and snapshot independence',()=>{const p=sample();assert.deepEqual(parsePlan(serializePlan(p)),{ok:true,plan:p});p.current.x=10;assert.equal(SECTOR.hab.x,4);});
test('tampered plan is rejected',()=>{const p=sample();p.hazard=true;assert.equal(parsePlan(encode(p)).ok,false);});
test('unsupported versions, bad grid coordinates, unsafe ids rejected',()=>{for(const change of [p=>p.schemaVersion=9,p=>p.current.x=40,p=>p.current.y=.5,p=>p.stops[0].id='<img src=x>']){const p=sample();change(p);delete p.checksum;p.checksum=checksum(p);assert.equal(parsePlan(encode(p)).ok,false);}});
test('malformed and oversized payloads fail safely',()=>{for(const text of ['','@@@','a'.repeat(24001),'e30'])assert.equal(parsePlan(text).ok,false);});
test('recon snapshot preserves inputs',()=>{const p=makePlan({current:SECTOR.hab,stops:[],reconnaissance:{enabled:true,penalty:.5,revealed:[1,2,3]}});assert.deepEqual(parsePlan(serializePlan(p)).plan.reconnaissance,p.reconnaissance);});
