import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

// Verification/local serving only; dist/ is deployable on any static host.
export function staticServer(directory='dist',prefix='/'){
 const root=path.resolve(directory),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.md':'text/plain','.svg':'image/svg+xml'};
 return createServer(async(req,res)=>{
   try{
     const url=new URL(req.url,'http://localhost');
     if(url.pathname.endsWith('/favicon.ico')){res.writeHead(204);res.end();return;}
     if(!url.pathname.startsWith(prefix))throw Error('Outside mount');
     const relative=decodeURIComponent(url.pathname.slice(prefix.length));
     let file=path.resolve(root,relative || 'index.html');
     if(file!==root&&!file.startsWith(root+path.sep))throw Error('Outside root');
     if((await stat(file)).isDirectory())file=path.join(file,'index.html');
     const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain','Cache-Control':'no-store'});res.end(data);
   }catch{res.writeHead(404);res.end('Not found');}
 });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const flag=(name,fallback)=>{const i=process.argv.indexOf(name);return i<0?fallback:process.argv[i+1];};
 const port=Number(flag('--port','8012'));
 staticServer(flag('--directory','dist')).listen(port,'127.0.0.1',()=>console.log(`ARES-HUD: http://127.0.0.1:${port}/`));
}
