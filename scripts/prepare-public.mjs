import fs from 'node:fs';
import path from 'node:path';
for(const name of ['DATA_SOURCES.md','assets/README.md','THIRD_PARTY.md']){
 const destination=path.join('public/docs',name);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.copyFileSync(path.join('docs',name),destination);
}
for(const name of ['react','react-dom','scheduler','lucide-react']){
 const directory=path.join('public/licenses',name);fs.mkdirSync(directory,{recursive:true});fs.copyFileSync(path.join('node_modules',name,'LICENSE'),path.join(directory,'LICENSE'));
}
fs.copyFileSync('LICENSE','public/LICENSE');
