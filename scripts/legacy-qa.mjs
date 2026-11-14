import {chromium} from 'playwright-core';
import {staticServer} from './static-server.mjs';
import fs from 'node:fs';
const server=staticServer('.');
await new Promise(resolve=>server.listen(5176,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];
try{
 for(const [width,reduced] of [[1440,false],[360,false],[360,true]]){
   const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:reduced?'reduce':'no-preference'});
   await page.goto('http://127.0.0.1:5176/legacy/browser-test.html'+(width===360?'?width=360':''));
   await page.waitForFunction(()=>document.getElementById('result').textContent!=='RUNNING',null,{timeout:90000});
   const result=await page.locator('#result').innerText(),log=await page.locator('#log').innerText();
   results.push({width,reduced,result,log});console.log(width,reduced?'reduced':'',result);
   if(!result.startsWith('PASS')){console.error(log.split('\n').filter(l=>l.startsWith('FAIL')).join('\n'));process.exitCode=1;}
   await page.close();
 }
}finally{fs.writeFileSync('.browser-qa/legacy-migration-report.json',JSON.stringify({browser:browser.version(),results},null,2));await browser.close();await new Promise(resolve=>server.close(resolve));}
