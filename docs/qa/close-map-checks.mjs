import {chromium} from 'playwright-core';
import {createServer} from 'vite';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const output='docs/qa/baseline-closure';
const server=await createServer({server:{host:'127.0.0.1',port:5181,strictPort:true}});await server.listen();
const browser=await chromium.launch({channel:'msedge',headless:true});
const result={browser:browser.version(),at:new Date().toISOString(),runs:[],errors:[]};
try{
 for(const width of [1440,360]){
  const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5181/');await page.locator('#mars-map .leaflet-tile-loaded').first().waitFor();
  const measures=await page.evaluate(async()=>{
   const {SECTOR}=await import('/src/domain/sector.js');
   const {gridToLatLng,gridCornerToLatLng,latLngToGrid}=await import('/src/domain/geo.js');
   const host=document.querySelector('#mars-map'),map=host.__map,original={center:map.getCenter(),zoom:map.getZoom()};
   const measurements=[];
   const initial={zoom:original.zoom,containsSector:map.getBounds().contains([[SECTOR.bounds.south,SECTOR.bounds.west],[SECTOR.bounds.north,SECTOR.bounds.east]])};
   for(const zoom of [11,12,13]){
    map.setView([SECTOR.centre.lat,SECTOR.centre.lng],zoom,{animate:false,reset:true});map.panBy([12,-8],{animate:false});
    const rect=host.getBoundingClientRect(),markers=[];
    for(const layer of Object.values(map._layers))if(layer instanceof L.Marker){
     const el=layer.getElement().querySelector('button'),r=el.getBoundingClientRect(),point=map.latLngToContainerPoint(layer.getLatLng());
     markers.push({label:el.getAttribute('aria-label'),width:r.width,height:r.height,error:Math.hypot(r.left+r.width/2-rect.left-point.x,r.top+r.height/2-rect.top-point.y)});
    }
    const routes=[];
    for(const layer of Object.values(map._layers))if(layer instanceof L.Polyline && layer.options.pane==='routes'){
     const ll=layer.getLatLngs();
     for(let i=0;i<ll.length;i++){const expected=map.latLngToLayerPoint(ll[i]),actual=layer._rings[0][i];routes.push(Math.hypot(expected.x-actual.x,expected.y-actual.y));}
    }
    measurements.push({zoom,markers,routeVertices:routes.length,maxRouteError:Math.max(0,...routes)});
   }
   map.setView([SECTOR.centre.lat,SECTOR.centre.lng],12,{animate:false,reset:true});
   const a=gridCornerToLatLng(SECTOR,0,0),b=gridCornerToLatLng(SECTOR,1,0),pa=map.latLngToLayerPoint([a.lat,a.lng]),pb=map.latLngToLayerPoint([b.lat,b.lng]);
   const extent={northSouth:map.distance([SECTOR.bounds.south,SECTOR.centre.lng],[SECTOR.bounds.north,SECTOR.centre.lng]),eastWest:map.distance([SECTOR.centre.lat,SECTOR.bounds.west],[SECTOR.centre.lat,SECTOR.bounds.east]),cellWidthPixels:Math.abs(pb.x-pa.x)};
   const crs=map.options.crs;
   const spike={world:crs.getProjectedBounds(0).getSize(),northwest:crs.latLngToPoint(L.latLng(90,-180),0),southeast:crs.latLngToPoint(L.latLng(-90,180),0),degree:crs.distance({lat:0,lng:0},{lat:1,lng:0}),tile10:crs.latLngToPoint(L.latLng(90-403*180/1024,-180+1463*180/1024),10),tile12:crs.latLngToPoint(L.latLng(90-1628*180/4096,-180+5858*180/4096),12)};
   map.setView(original.center,original.zoom,{animate:false,reset:true});
   const p=gridToLatLng(SECTOR,20,20);map.fire('mousemove',{latlng:L.latLng(p.lat,p.lng)});
   return {initial,measurements,extent,spike,expectedReadoutCell:latLngToGrid(SECTOR,p),leaflet:L.version};
  });
  assert.equal(measures.leaflet,'1.9.4');assert.ok(measures.initial.containsSector);
  assert.deepEqual(measures.spike.world,{x:512,y:256});assert.deepEqual(measures.spike.northwest,{x:0,y:0});assert.deepEqual(measures.spike.southeast,{x:512,y:256});
  assert.ok(Math.abs(measures.spike.degree-59274.6975)<1);
  assert.deepEqual(measures.spike.tile10,{x:1463*256,y:403*256});assert.deepEqual(measures.spike.tile12,{x:5858*256,y:1628*256});
  assert.ok(Math.abs(measures.extent.northSouth-4000)<=1);assert.ok(Math.abs(measures.extent.eastWest-4000)<=1);assert.ok(measures.extent.cellWidthPixels>8);
  for(const zoom of measures.measurements){assert.equal(zoom.markers.length,4);assert.ok(zoom.markers.every(p=>p.error<=1&&p.width===44&&p.height===44));assert.ok(zoom.routeVertices>0&&zoom.maxRouteError<=1);}
  const readout=await page.locator('.map-panel > [role="status"]').innerText();
  assert.match(readout,/grid cell 20, 20/);
  await page.getByText('Layers & provenance',{exact:true}).click();assert.match(await page.locator('.layer-options').innerText(),/77\.38942–77\.46058 E/);
  const cost=await page.locator('.telemetry-panel .metrics').innerText();
  await page.getByRole('button',{name:'Simulate dust hazard',exact:true}).click();const dusty=await page.locator('.telemetry-panel .metrics').innerText();assert.notEqual(dusty,cost);
  await page.getByLabel('SIMULATED hazard shading',{exact:true}).uncheck();assert.equal(await page.locator('.telemetry-panel .metrics').innerText(),dusty);
  await page.getByLabel('SIMULATED hazard shading',{exact:true}).check();
  await page.getByRole('button',{name:'Reset scenario',exact:true}).click();
  await page.getByLabel('Set simulated position',{exact:true}).selectOption('science');await page.getByRole('button',{name:'Simulate dust hazard',exact:true}).click();
  assert.match(await page.locator('.telemetry-panel').innerText(),/identical endpoints need no detour/);
  await page.getByRole('button',{name:'Reset scenario',exact:true}).click();
  const buttons=page.locator('#mars-map .hud-marker__button');
  for(let i=0;i<await buttons.count();i++){await buttons.nth(i).focus();assert.equal(await buttons.nth(i).evaluate(e=>e===document.activeElement),true);}
  await page.evaluate(()=>{const m=document.querySelector('#mars-map').__map;for(const layer of Object.values(m._layers))if(layer instanceof L.TileLayer){layer.fire('tileerror');break;}});
  assert.match(await page.locator('.map-panel > [role="status"]').innerText(),/Cached orbital tiles unavailable/);assert.match(await page.locator('.telemetry-panel .metrics').innerText(),/21\.49 cost units/);
  result.runs.push({width,...measures,readout,errors});assert.deepEqual(errors,[]);
  await page.reload();await page.locator('#mars-map .leaflet-tile-loaded').first().waitFor();
  await page.screenshot({path:`${output}/registered-map-${width}.png`,fullPage:true});await page.close();
 }
 // A raw tile-grid contact sheet is evidence, never a new application viewport.
 const page=await browser.newPage({viewport:{width:1600,height:1650}});
 await page.goto('http://127.0.0.1:5181/');
 await page.setContent(`<html><head><style>body{margin:0;background:#101820;color:white;font:18px system-ui}h1,p{margin:12px}.grid{display:grid;grid-template-columns:repeat(6,256px);width:1536px}.grid img{width:256px;height:256px;display:block}</style></head><body><h1>NASA Mars Trek CTX · Jezero · OBSERVED</h1><p>Level 11 rows 811–816 / columns 2926–2931 · north at top · original cached contact tiles, no reprojection</p><div class="grid">${Array.from({length:36},(_,i)=>`<img src="http://127.0.0.1:5181/.browser-qa/contact/${811+Math.floor(i/6)}-${2926+i%6}.png">`).join('')}</div><p>NASA/JPL-Caltech/MSSS via Mars Trek · Qualitative comparison only, no unit-to-grid registration</p></body></html>`);
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth===256));
 await page.screenshot({path:`${output}/ctx-level11-contact.png`,fullPage:true});await page.close();
}catch(e){result.errors.push(e.stack);console.error(e);process.exitCode=1;}
finally{fs.writeFileSync(`${output}/registered-map-checks.json`,JSON.stringify(result,null,2));await browser.close();await server.close();}
