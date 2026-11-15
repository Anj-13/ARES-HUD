import {useEffect,useRef,useState} from 'react';
import * as THREE from '../../vendor/three/three.module.js';

// Original procedural artwork. No planetary observations or geolocation input.
function surfaceTexture(){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=256;
 const context=canvas.getContext('2d'),pixels=context.createImageData(512,256);
 for(let y=0;y<256;y++)for(let x=0;x<512;x++){
  const u=x/512*Math.PI*2,v=y/256*Math.PI;
  const n=Math.sin(5*u+3*Math.cos(v))*Math.sin(7*v)+.45*Math.cos(13*u-9*v)+.2*Math.sin(31*u+23*v);
  const polar=Math.pow(Math.abs(Math.cos(v)),28),i=(y*512+x)*4;
  pixels.data.set([153+n*24+polar*65,70+n*15+polar*115,43+n*9+polar*128,255],i);
 }
 context.putImageData(pixels,0,0);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}

export default function PlanetaryGlobe({onExplore}){
 const host=useRef(null),controls=useRef(null),[error,setError]=useState('');
 useEffect(()=>{
  let renderer,geometry,material,texture,observer,frame=0,disposed=false;
  const node=host.current,abort=new AbortController(),options={signal:abort.signal};
  const fail=()=>{if(!disposed)setError('3D rendering unavailable. You can still explore Jezero.');};
  try{
   renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
   const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('aria-label','Illustrative Mars globe. Arrow keys rotate; plus and minus zoom; Home resets.');node.append(canvas);
   const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,.1,20);camera.position.z=3.5;
   texture=surfaceTexture();geometry=new THREE.SphereGeometry(1,64,40);material=new THREE.MeshStandardMaterial({map:texture,roughness:1});
   const sphere=new THREE.Mesh(geometry,material);sphere.rotation.z=.12;scene.add(sphere,new THREE.AmbientLight(0xffffff,1.4));
   const light=new THREE.DirectionalLight(0xffe3cd,3);light.position.set(-3,2,4);scene.add(light);
   const draw=()=>{if(disposed||document.hidden||frame)return;frame=requestAnimationFrame(()=>{frame=0;if(!disposed&&!document.hidden)renderer.render(scene,camera);});};
   const move=(x=0,y=0,zoom=1)=>{sphere.rotation.y+=x;sphere.rotation.x=Math.max(-1.4,Math.min(1.4,sphere.rotation.x+y));camera.position.z=Math.max(2,Math.min(6,camera.position.z*zoom));canvas.dataset.rotation=String(sphere.rotation.y);canvas.dataset.zoom=String(camera.position.z);draw();};
   const reset=()=>{sphere.rotation.set(0,0,.12);camera.position.z=3.5;move();};controls.current={move,reset};reset();
   observer=new ResizeObserver(()=>{const width=node.clientWidth,height=node.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();draw();});observer.observe(node);
   let pointer=null,lastX=0,lastY=0;
   canvas.addEventListener('pointerdown',e=>{if(pointer!==null)return;pointer=e.pointerId;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(pointer);canvas.focus();},options);
   canvas.addEventListener('pointermove',e=>{if(e.pointerId!==pointer)return;move((e.clientX-lastX)*.008,(e.clientY-lastY)*.008);lastX=e.clientX;lastY=e.clientY;},options);
   for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>{pointer=null;},options);
   canvas.addEventListener('wheel',e=>{e.preventDefault();move(0,0,e.deltaY>0?1.08:1/1.08);},{...options,passive:false});
   canvas.addEventListener('keydown',e=>{const commands={ArrowLeft:()=>move(-.15),ArrowRight:()=>move(.15),ArrowUp:()=>move(0,-.15),ArrowDown:()=>move(0,.15),'+':()=>move(0,0,.9),'=':()=>move(0,0,.9),'-':()=>move(0,0,1.1),Home:reset};if(commands[e.key]){e.preventDefault();commands[e.key]();}},options);
   canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fail();},options);
   document.addEventListener('visibilitychange',draw,options);
  }catch{fail();}
  return()=>{disposed=true;abort.abort();observer?.disconnect();cancelAnimationFrame(frame);controls.current=null;geometry?.dispose();material?.dispose();texture?.dispose();renderer?.dispose();renderer?.forceContextLoss();renderer?.domElement.remove();};
 },[]);
 return <div className="planetary-overview"><h3>Illustrative Planetary Overview</h3><p className="tiny">SIMULATED artwork · Original stylized Mars · No geographic registration</p>{error?<p role="status">{error}</p>:<div className="planetary-canvas" ref={host}/>}
 <div className="planetary-controls">{!error&&<><button className="button" onClick={()=>controls.current?.move(-.2)}>Rotate left</button><button className="button" onClick={()=>controls.current?.move(.2)}>Rotate right</button><button className="button" onClick={()=>controls.current?.move(0,0,.9)}>Zoom in</button><button className="button" onClick={()=>controls.current?.move(0,0,1.1)}>Zoom out</button><button className="button" onClick={()=>controls.current?.reset()}>Reset globe</button></>}<button className="button primary" onClick={onExplore}>Explore Jezero</button></div><p className="tiny">Drag or use arrow keys to rotate. +/− zoom; Home resets. Surface planning opens the registered NASA map.</p></div>;
}
