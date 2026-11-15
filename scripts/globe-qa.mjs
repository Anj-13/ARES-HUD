import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {staticServer} from './static-server.mjs';
const server=staticServer('dist','/ARES-HUD/');await new Promise(r=>server.listen(5188,'127.0.0.1',r));
const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
try{
 for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:{width:mobile?360:1280,height:900},hasTouch:mobile,reducedMotion:mobile?'reduce':'no-preference'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5188/ARES-HUD/');await page.locator('#mars-map .leaflet-tile-loaded').first().waitFor();const before=await page.locator('.telemetry-panel').innerText();
 for(let i=0;i<3;i++){
 await page.getByRole('button',{name:'GLOBE',exact:true}).click();const canvas=page.locator('.planetary-canvas canvas');await canvas.waitFor();await page.waitForTimeout(150);
 const rotation=await canvas.getAttribute('data-rotation');await page.getByRole('button',{name:'Rotate right',exact:true}).click();assert.notEqual(await canvas.getAttribute('data-rotation'),rotation);
 const zoom=await canvas.getAttribute('data-zoom');await page.getByRole('button',{name:'Zoom in',exact:true}).click();assert.notEqual(await canvas.getAttribute('data-zoom'),zoom);
 await canvas.focus();await page.keyboard.press('ArrowLeft');await page.keyboard.press('Home');assert.equal(await canvas.getAttribute('data-zoom'),'3.5');
 if(mobile){await canvas.scrollIntoViewIfNeeded();const b=await canvas.boundingBox(),cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width/2,y:b.y+b.height/2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+b.width/2+40,y:b.y+b.height/2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.notEqual(await canvas.getAttribute('data-rotation'),'0');await cdp.detach();}
 await page.getByRole('button',{name:'Explore Jezero',exact:true}).click();assert.equal(await page.locator('.planetary-canvas canvas').count(),0);assert.equal(await page.locator('.telemetry-panel').innerText(),before);assert.ok(await page.locator('#mars-map').isVisible());
 }
 assert.deepEqual(errors,[]);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));results.push({mobile,cycles:3,rotation:true,zoom:true,keyboard:true,touch:mobile,missionPreserved:true,errors});await context.close();
 }
 const context=await browser.newContext();await context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.includes('webgl')?null:original.call(this,type,...args);};});const page=await context.newPage();await page.goto('http://127.0.0.1:5188/ARES-HUD/');await page.getByRole('button',{name:'GLOBE',exact:true}).click();await page.getByText('3D rendering unavailable.',{exact:false}).waitFor();await page.getByRole('button',{name:'Explore Jezero',exact:true}).click();assert.ok(await page.locator('#mars-map').isVisible());results.push({webglFallback:true});await context.close();console.log(JSON.stringify(results));
}finally{fs.mkdirSync('.browser-qa',{recursive:true});fs.writeFileSync('.browser-qa/simplified-globe.json',JSON.stringify(results,null,2));await browser.close();await new Promise(r=>server.close(r));}

