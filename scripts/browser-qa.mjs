import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createMissionStore} from '../src/state/mission-store.js';
import {makePlan,serializePlan} from '../src/domain/plan.js';
import {SECTOR} from '../src/domain/sector.js';
import {staticServer} from './static-server.mjs';

const production=process.argv.includes('--production');
const server=production?staticServer('dist','/ares-hud/'):null;
if(server)await new Promise(resolve=>server.listen(5175,'127.0.0.1',resolve));
const devServer=!production&&!process.env.QA_URL?await (await import('vite')).createServer({server:{host:'127.0.0.1',port:5177,strictPort:true}}):null;
if(devServer)await devServer.listen();
const base=process.env.QA_URL || (production?'http://127.0.0.1:5175/ares-hud/':'http://127.0.0.1:5177/');
const dev=!production && process.env.QA_DEV!=='0';
fs.mkdirSync('.browser-qa',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const report={url:base,browser:browser.version(),runs:[],failures:[]};
const expected=createMissionStore();
const near=(a,b)=>Math.abs(a-b)<1e-6;
async function run(width,reduced=false){
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:reduced?'reduce':'no-preference'});
 const page=await context.newPage(),errors=[],badRequests=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)badRequests.push(`${r.status()} ${r.url()}`);});
 await page.route('**/*',route=>{const url=new URL(route.request().url());return url.origin===new URL(base).origin?route.continue():route.abort();});
 async function check(name,fn){await fn();checks.push(name);console.log(`PASS ${width}${reduced?' reduced':''}: ${name}`);}
 const button=name=>page.getByRole('button',{name,exact:true});
 const metrics=()=>page.locator('.telemetry-panel .metrics').innerText();
 await page.goto(base);await page.locator('#mars-map .leaflet-tile-loaded').first().waitFor();
 await check('NASA tiles decoded; attribution, scale and genuine metrics',async()=>{
   assert.ok(await page.locator('#mars-map .leaflet-tile-loaded').evaluateAll(imgs=>imgs.length>0&&imgs.every(i=>i.naturalWidth===256)));
   assert.match(await metrics(),new RegExp(expected.getSnapshot().metrics.cost));
   assert.match(await page.locator('.leaflet-control-attribution').innerText(),/NASA\/JPL-Caltech\/MSSS/);
   assert.ok(await page.locator('.leaflet-control-scale-line').count());
   assert.equal(await page.locator('.map-demo,.demo-watermark,.terrain-grid').count(),0);
 });
 await check('registered map keyboard zoom and pan',async()=>{
   const map=page.locator('#mars-map');await map.focus();
   const before=dev?await map.evaluate(e=>({zoom:e.__map.getZoom(),lng:e.__map.getCenter().lng})):null;
   await page.keyboard.press('+');await page.waitForTimeout(350);await page.keyboard.press('ArrowRight');await page.waitForTimeout(350);
   if(dev){const after=await map.evaluate(e=>({zoom:e.__map.getZoom(),lng:e.__map.getCenter().lng}));assert.ok(after.zoom>before.zoom);assert.notEqual(after.lng,before.lng);}
   await button('Reset view').click();
 });
 await check('waypoint selection, ordering, inclusion and traverse metrics',async()=>{
   await page.getByTitle('Move earlier').nth(1).click();
   assert.match(await page.locator('.stop-check').first().innerText(),/Channel mouth/);
   await page.locator('.stop-check input').first().uncheck();
   await button('Plan selected traverse').click();
   assert.equal(await page.locator('.route-sequence li').count(),2);
   if(dev){const s=await page.evaluate(()=>window.__aresMission.getSnapshot());assert.deepEqual(s.targets.map(p=>p.id),['delta-front','distal-lobe']);}
   await button('Reset scenario').click();await button('Select delta-front science stop').click();
 });
 await check('dust reroutes; arrival and Return to Hab; reset restores',async()=>{
   const clear=await metrics();await button('Simulate dust hazard').click();assert.notEqual(await metrics(),clear);
   assert.match(await page.locator('.telemetry-panel').innerText(),/recomputed detour/);
   await button('Clear simulated dust hazard').click();await button('Simulate arrival at next stop').click();
   assert.doesNotMatch(await page.locator('.readout').innerText(),/^Hab$/);
   await button('Return to Hab').click();assert.match(await page.locator('.telemetry-panel h4').innerText(),/Route to Hab/);
   await button('Reset scenario').click();assert.equal(await page.locator('.readout').innerText(),'Hab');
   await page.getByLabel('Set simulated position',{exact:true}).selectOption('science');assert.match(await metrics(),/0 grid steps/);
   await page.getByLabel('Set simulated position',{exact:true}).selectOption('hab');assert.equal(await metrics(),clear);
 });
 await check('fullscreen and Globe preserve map identity, centre and zoom',async()=>{
   if(dev)await page.evaluate(()=>{const e=document.querySelector('#mars-map');window.__qaMap=e.__map;window.__qaCenter=e.__map.getCenter();window.__qaZoom=e.__map.getZoom();});
   await button('MAP').click();await page.waitForTimeout(150);assert.equal(await page.locator('.mission-panel').count(),0);
   await button('EXIT FULLSCREEN').click();await page.waitForTimeout(150);
   await button('GLOBE').click();assert.match(await page.locator('.globe-placeholder').innerText(),/No globe renderer/);
   await button('MAP').click();
   if(dev)assert.ok(await page.evaluate(()=>{const m=document.querySelector('#mars-map').__map;return m===window.__qaMap&&Math.abs(m.getCenter().lng-window.__qaCenter.lng)<1e-6&&Math.abs(m.getCenter().lat-window.__qaCenter.lat)<1e-6&&m.getZoom()===window.__qaZoom;}));
 });
 await check('eight Sol timeline, scrub, playback, reconnaissance and mission logs',async()=>{
   await page.getByLabel('Mission sol',{exact:true}).selectOption('3');
   const scrub=page.getByRole('slider',{name:'Mission modeled-cost progress'});
   await scrub.fill('50');assert.match(await page.locator('.timeline-foot').innerText(),/Traveled [1-9]/);
   await page.getByLabel('Simulated reconnaissance',{exact:true}).check();
   assert.match(await page.locator('.timeline').innerText(),/not real obstacle detection/);
   await button('Play').click();await page.waitForTimeout(450);
   if(reduced){assert.equal(await button('Pause').count(),0);assert.equal(await scrub.inputValue(),'55');}else {assert.equal(await button('Pause').count(),1);assert.ok(Number(await scrub.inputValue())>50);await button('Pause').click();}
   await page.getByLabel('Mission sol',{exact:true}).selectOption('8');await scrub.fill('100');
   assert.equal(await page.locator('.readout').innerText(),'Hab');
   await page.locator('.timeline summary').click();assert.equal(await page.locator('.timeline li').count(),8);
   await button('Exit timeline preview').click();
   await page.getByLabel('Simulated reconnaissance',{exact:true}).uncheck();await button('Reset scenario').click();
 });
 await check('tablet validates and independently calculates; local hazard, return, reset',async()=>{
   await button('Plan selected traverse').click();const desktopMetrics=await metrics();
   await button('SEND TO TABLET').click();const dialog=page.getByRole('dialog');
   await dialog.locator('#tablet-map .leaflet-tile-loaded').first().waitFor();
   const encoded=await dialog.getByRole('link',{name:'Open independent tablet in another window'}).getAttribute('href');
   assert.match(await dialog.innerText(),new RegExp(desktopMetrics.match(/([\d.]+) cost units/)[1].replace('.','\\.')));
   await dialog.getByRole('button',{name:'Simulate dust hazard',exact:true}).click();
   assert.equal(await metrics(),desktopMetrics);
   await dialog.getByRole('button',{name:'Return to Hab',exact:true}).click();
   await dialog.getByRole('button',{name:'Reset received plan',exact:true}).click();
   const tablet=await context.newPage();tablet.on('pageerror',e=>errors.push(e.message));
   await tablet.goto(encoded);await tablet.locator('#tablet-map .leaflet-tile-loaded').first().waitFor();
   assert.match(await tablet.locator('body').innerText(),/independently recomputed/);
   assert.ok(await tablet.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await tablet.goto(new URL('tablet.html#bad!',base).href);assert.match(await tablet.getByRole('alert').innerText(),/Invalid/);
   const blocked=serializePlan(makePlan({current:{x:20,y:20},stops:[{...SECTOR.stops[0],selected:true}],hazard:true}));
   await tablet.goto(new URL('tablet.html#'+blocked,base).href);assert.match(await tablet.locator('.tablet-content').innerText(),/No route available/);
   assert.match(await tablet.locator('.tablet-content').innerText(),/— steps/);
   await tablet.close();await page.keyboard.press('Escape');assert.equal(await dialog.count(),0);
   assert.equal(await button('SEND TO TABLET').evaluate(e=>e===document.activeElement),true);
 });
 await check('Sources retains verified citations, science notes, accessible modal focus',async()=>{
   await button('SOURCES').click();const dialog=page.getByRole('dialog');
   assert.match(await dialog.innerText(),/Jezero_CTX_BlockAdj_dd/);assert.match(await dialog.innerText(),/INTERPRETED/);
   for(const href of await dialog.locator('a[href]').evaluateAll(els=>els.map(e=>e.href).filter(h=>new URL(h).origin===location.origin))){assert.equal((await page.request.get(href)).status(),200,href);}
   await page.keyboard.press('Tab');assert.equal(await page.getByLabel('Close dialog').evaluate(e=>e===document.activeElement),true);
   await page.keyboard.press('Shift+Tab');assert.ok(await dialog.locator('a').last().evaluate(e=>e===document.activeElement));
   await page.keyboard.press('Escape');assert.equal(await button('SOURCES').evaluate(e=>e===document.activeElement),true);
 });
 if(dev)await check('unreachable UI and StrictMode Leaflet cleanup / remount',async()=>{
   await page.evaluate(()=>window.__aresMission.actions.override(g=>g.map(r=>r.map(c=>({...c,blocked:true})))));
   assert.match(await page.locator('.telemetry-panel h4').innerText(),/No route available/);
   assert.match(await metrics(),/—/);
   assert.equal(await page.locator('#mars-map').evaluate(e=>Object.values(e.__map._layers).filter(l=>l.options?.pane==='routes'&&l.getLatLngs).length),0);
   await page.evaluate(()=>{window.__oldStore=window.__aresMission;window.__oldStore.actions.override(null);window.__oldStore.actions.playing(true);});
   await page.waitForTimeout(150);
   await page.evaluate(async()=>{
     window.__aresRoot.unmount();window.__stoppedProgress=window.__oldStore.getSnapshot().progress;const client=await import('/node_modules/.vite/deps/react-dom_client.js');const react=await import('/node_modules/.vite/deps/react.js');const React=react.default||react;const {default:App}=await import('/src/App.jsx');
     window.__aresRoot=(client.createRoot||client.default.createRoot)(document.getElementById('root'));window.__aresRoot.render(React.createElement(React.StrictMode,null,React.createElement(App)));
   });
   await page.locator('#mars-map .leaflet-tile-loaded').first().waitFor();assert.equal(await page.locator('#mars-map.leaflet-container').count(),1);
   await page.waitForTimeout(250);assert.ok(await page.evaluate(()=>window.__oldStore.getSnapshot().progress===window.__stoppedProgress));
 });
 await check('responsive layout, no runtime errors or failed local assets, no external runtime requests',async()=>{
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);assert.deepEqual(badRequests,[]);
 });
 await page.screenshot({path:`.browser-qa/react-${dev?'dev':'production'}-${width}${reduced?'-reduced':''}.png`,fullPage:true});
 report.runs.push({width,reduced,checks,errors,badRequests,font:await page.locator('h1').evaluate(e=>getComputedStyle(e).fontFamily)});
 await context.close();
}
try{for(const [w,r] of [[1440,false],[768,false],[360,false],[360,true]])await run(w,r);}
catch(e){report.failures.push(e.stack);console.error(e);process.exitCode=1;}
finally{fs.writeFileSync(`.browser-qa/react-${dev?'dev':'production'}-report.json`,JSON.stringify(report,null,2));await browser.close();if(server)await new Promise(resolve=>server.close(resolve));if(devServer)await devServer.close();}
