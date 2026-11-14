"""One-time recoverable migration. Original source stays in legacy/."""
from pathlib import Path
import shutil
import re
import json

root = Path(__file__).resolve().parent.parent
def write(path, value):
    target = root / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(value, encoding='utf-8')

originals = list(root.glob('*.js')) + list(root.glob('*.html')) + [root/'styles.css', root/'package.json']
for source in originals:
    target = root/'legacy'/source.name
    target.parent.mkdir(exist_ok=True)
    if not target.exists():
        shutil.copy2(source, target)
for name in ['UI', 'initial-files']:
    dest = root/'legacy'/name
    if not dest.exists():
        shutil.copytree(root/name, dest, ignore=shutil.ignore_patterns('node_modules'))
for name in ['assets', 'vendor']:
    shutil.copytree(root/name, root/'public'/name, dirs_exist_ok=True)
domain = ['pathfinding', 'geo', 'map-crs', 'plan', 'mission', 'sector', 'sols', 'fog', 'datasets']
for name in domain:
    write('src/domain/'+name+'.js', (root/(name+'.js')).read_text(encoding='utf-8'))
for name in ['map', 'sector-layers']:
    source = (root/(name+'.js')).read_text(encoding='utf-8')
    source = re.sub(r"from './([^']+)'", r"from '../domain/\1'", source)
    write('src/integrations/'+name+'.js', source)
for source in root.glob('*.test.js'):
    text = source.read_text(encoding='utf-8')
    text = re.sub(r"from './([^']+)'", r"from '../src/domain/\1'", text)
    if source.name == 'mission.test.js':
        text = text.replace('existsSync(d.local)', "existsSync('public/'+d.local)")
        text = text.replace("readFileSync('assets/", "readFileSync('public/assets/")
        text = text.replace('readFileSync(t.file)', "readFileSync('public/'+t.file)")
    write('tests/'+source.name, text)
shutil.copytree(root/'react-ui-handoff/src', root/'src', dirs_exist_ok=True)
# Keep the original browser regression harness runnable against the saved app.
for source in (root/'legacy').glob('*'):
    if source.suffix in ['.js', '.html']:
        text = source.read_text(encoding='utf-8')
        text = text.replace("'assets/", "'../public/assets/").replace('"assets/', '"../public/assets/')
        text = text.replace('"vendor/', '"../public/vendor/')
        text = text.replace('"docs/', '"../docs/')
        source.write_text(text, encoding='utf-8')
for name in ['fetch-tiles.mjs', 'vendor-leaflet.mjs']:
    path = root/'scripts'/name
    text = path.read_text(encoding='utf-8')
    for module in ['sector', 'geo']:
        text = text.replace('../'+module+'.js', '../src/domain/'+module+'.js')
    # Manifest filenames deliberately retain their deployed assets/ paths.
    if name == 'fetch-tiles.mjs':
        text = text.replace("path.join(ROOT, rel)", "path.join(ROOT, 'public', rel)")
        text = text.replace("path.join(ROOT, 'assets", "path.join(ROOT, 'public/assets")
    else:
        text = text.replace("'vendor/", "'public/vendor/")
    path.write_text(text, encoding='utf-8')
write('package.json', json.dumps({
    'name':'ares-hud', 'version':'0.3.0', 'private':True, 'type':'module',
    'scripts':{'dev':'vite --host 127.0.0.1', 'build':'vite build', 'preview':'vite preview --host 127.0.0.1', 'test':'node --test tests/*.test.js', 'test:browser':'node scripts/browser-qa.mjs'},
    'dependencies':{'react':'18.3.1','react-dom':'18.3.1','lucide-react':'0.468.0'},
    'devDependencies':{'vite':'6.0.0','playwright-core':'1.51.1'}
}, indent=2)+'\n')
write('index.html', '''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ARES-HUD / Mission control</title><link rel="stylesheet" href="%BASE_URL%vendor/leaflet/leaflet.css"></head><body><div id="root"></div><noscript>This mission planner requires JavaScript.</noscript><script src="%BASE_URL%vendor/leaflet/leaflet.js"></script><script type="module" src="/src/main.jsx"></script></body></html>''')
write('tablet.html', '''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ARES-HUD / EVA tablet</title><link rel="stylesheet" href="%BASE_URL%vendor/leaflet/leaflet.css"></head><body><div id="root"></div><script src="%BASE_URL%vendor/leaflet/leaflet.js"></script><script type="module" src="/src/tablet-main.jsx"></script></body></html>''')
write('vite.config.js', "import {defineConfig} from 'vite';\nimport {resolve} from 'node:path';\nexport default defineConfig({base:'./',build:{rollupOptions:{input:{main:resolve(import.meta.dirname,'index.html'),tablet:resolve(import.meta.dirname,'tablet.html')}}}});\n")
