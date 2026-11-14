import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({base:'./',esbuild:{jsx:'automatic'},build:{rollupOptions:{input:{main:resolve(import.meta.dirname,'index.html'),tablet:resolve(import.meta.dirname,'tablet.html')}}}});
