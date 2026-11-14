"""Consolidate only after Node and development browser regression passes."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parent.parent
def verified_move(source,target):
    source=(root/source).resolve();target=(root/target).resolve()
    assert source.is_relative_to(root) and target.is_relative_to(root)
    assert source!=root and not target.exists(), (source,target)
    print('Verified workspace move:',source,'->',target)
    target.parent.mkdir(parents=True,exist_ok=True);shutil.move(str(source),str(target))
for name in ['assets','vendor']:
    for p in (root/name).rglob('*'):
        if p.is_file():assert p.read_bytes()==(root/'public'/p.relative_to(root)).read_bytes(),p
    verified_move(name,'legacy/'+name)
for p in (root/'legacy').glob('*'):
    if p.suffix in ['.js','.html']:
        s=p.read_text(encoding='utf-8').replace('../public/assets/','assets/').replace('../public/vendor/','vendor/')
        p.write_text(s,encoding='utf-8')
for name in ['UI','initial-files']:
    node=root/name/'node_modules'
    if node.exists():verified_move(name+'/node_modules','legacy/'+name+'/node_modules')
    for p in (root/name).rglob('*'):
        if p.is_file():
            assert p.read_bytes()==(root/'legacy'/p.relative_to(root)).read_bytes(),p
            p.unlink()
    for d in sorted((root/name).rglob('*'),key=lambda p:len(p.parts),reverse=True):
        if d.is_dir():d.rmdir()
    (root/name).rmdir()
original_names=['app','map','map-crs','pathfinding','geo','plan','mission','mission-controls','fog','sols','tablet','datasets','sector','sector-layers','exploration']
for name in original_names:
    assert (root/'legacy'/(name+'.js')).exists()
    (root/(name+'.js')).unlink()
for p in root.glob('*.test.js'):
    assert (root/'legacy'/p.name).exists() and (root/'tests'/p.name).exists()
    p.unlink()
for name in ['browser-test.html','styles.css']:
    assert (root/'legacy'/name).exists();(root/name).unlink()
for name in ['qa-screen.png','qa-regression.png']:
    verified_move(name,'docs/qa/'+name)
shutil.copy2(root/'serve.py',root/'legacy/serve.py')
for name in ['migrate-layout.py','finish-layout.py']:
    verified_move('scripts/'+name,'legacy/migration-scripts/'+name)
