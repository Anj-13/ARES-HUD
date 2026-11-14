"""Reproducible Task 0/0D evidence; no application or source asset mutation."""
from pathlib import Path
import re
import json
import math
import hashlib
import xml.etree.ElementTree as ET
import sys
from urllib.parse import unquote
from urllib.request import Request, urlopen
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'docs/qa/baseline-closure';OUT.mkdir(exist_ok=True)
def output(name,data):
    (OUT/name).write_text(json.dumps(data,indent=2,ensure_ascii=False),encoding='utf-8')
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def document_files():
    return [ROOT/p for p in ['AGENTS.md','README.md','STATUS.md']]+sorted((ROOT/'docs').rglob('*.md'))+[ROOT/'react-ui-handoff/README.md',ROOT/'legacy/README.md']
def slug(text):
    text=re.sub(r'<[^>]*>','',text).lower().strip()
    return re.sub(r'[^\w\- ]','',text).replace(' ','-')
def anchors(path):
    text=path.read_text(encoding='utf-8');result=set();counts={}
    text=re.sub(r'^```[^\n]*\n[\s\S]*?^```[^\n]*$','',text,flags=re.M)
    for line in text.splitlines():
        m=re.match(r'^#{1,6}\s+(.+?)(?:\s+#+)?$',line)
        if m:
            name=slug(m.group(1));n=counts.get(name,0);counts[name]=n+1
            result.add(name+(f'-{n}' if n else ''))
    result.update(re.findall(r'(?:id|name)=[\"\']([^\"\']+)',text))
    return result
def audit_links():
    records=[];encodings=[]
    for path in document_files():
        source=path.relative_to(ROOT).as_posix()
        try:text=path.read_text(encoding='utf-8')
        except UnicodeError as exc:encodings.append({'file':source,'error':str(exc)});continue
        if '\ufffd' in text or re.search(r'(?:Ã.|Â.|â€|â€“|â€”|â†|â—)',text):encodings.append({'file':source,'error':'Possible mojibake/replacement character'})
        # Exclude fenced source examples; actual links in blockquotes still count.
        text=re.sub(r'^```[^\n]*\n[\s\S]*?^```[^\n]*$','',text,flags=re.M)
        for m in re.finditer(r'!?\[[^\]\n]*\]\((<[^>]+>|[^\s)]+)(?:\s+[\"\'][^\n]*?[\"\'])?\)',text):
            target=m.group(1).strip('<>');line=text.count('\n',0,m.start())+1
            if re.match(r'^[a-zA-Z][\w+.-]*:',target):
                records.append({'file':source,'line':line,'target':target,'kind':'external','ok':None});continue
            name,_,anchor=unquote(target).partition('#');name=name.split('?')[0]
            dest=(ROOT/name.lstrip('/')) if name.startswith('/') else ((path.parent/name).resolve() if name else path)
            ok=dest.exists();why=None if ok else 'missing path'
            if ok and anchor and dest.suffix.lower()=='.md' and anchor not in anchors(dest):ok=False;why='missing heading/anchor'
            records.append({'file':source,'line':line,'target':target,'kind':'local','ok':ok,'reason':why})
        for m in re.finditer(r'^\s*\[[^\]]+\]:\s*(\S+)',text,re.M):
            target=m.group(1).strip('<>')
            if not re.match(r'^[a-zA-Z][\w+.-]*:',target):
                name,_,anchor=unquote(target).partition('#');dest=(path.parent/name).resolve()
                records.append({'file':source,'line':text.count('\n',0,m.start())+1,'target':target,'kind':'reference','ok':dest.exists() and (not anchor or dest.suffix!='.md' or anchor in anchors(dest))})
    result={'at':datetime.now(timezone.utc).isoformat(),'documents':len(document_files()),'localLinks':sum(r['kind']!='external' for r in records),'externalLinks':sum(r['kind']=='external' for r in records),'broken':[r for r in records if r['ok'] is False],'encodingIssues':encodings,'links':records}
    output('markdown-links.json',result)
    print(json.dumps({k:v for k,v in result.items() if k!='links'},ensure_ascii=False,indent=2))
def numeric():
    tree=ET.parse(ROOT/'public/assets/trek-capabilities.xml')
    ns={'w':'http://www.opengis.net/wmts/1.0','o':'http://www.opengis.net/ows/1.1'}
    matrices=[]
    for matrix in tree.findall('.//w:TileMatrix',ns):
        identifier=matrix.find('o:Identifier',ns)
        if identifier is None:continue
        matrices.append({'level':int(identifier.text),'width':int(float(matrix.find('w:MatrixWidth',ns).text)),'height':int(float(matrix.find('w:MatrixHeight',ns).text)),'tileWidth':int(float(matrix.find('w:TileWidth',ns).text)),'tileHeight':int(float(matrix.find('w:TileHeight',ns).text))})
    one=2*math.pi*3396190/360
    geometry=[{'level':z,'degreesPerTile':180/2**z,'degreesPerPixel':180/2**z/256,'metresPerPixelNS':180/2**z/256*one,'metresPerPixelEW18_51N':180/2**z/256*one*math.cos(math.radians(18.51))} for z in [10,11,12]]
    old={'north':90-403*180/1024,'south':90-407*180/1024,'west':-180+1463*180/1024,'east':-180+1467*180/1024}
    overlap={'longitudeDegrees':min(old['east'],77.8)-max(old['west'],76.8),'latitudeDegrees':min(old['north'],18.7)-max(old['south'],17.7)}
    overlap['shareOfUSGSExtent']=overlap['longitudeDegrees']*overlap['latitudeDegrees']
    manifest=json.loads((ROOT/'public/assets/trek/manifest.json').read_text(encoding='utf-8'))
    assets=[{'file':r['file'],'bytes':(ROOT/'public'/r['file']).stat().st_size,'sha256':sha(ROOT/'public'/r['file']),'matches':sha(ROOT/'public'/r['file'])==r['sha256'] and (ROOT/'public'/r['file']).stat().st_size==r['bytes']} for r in manifest]
    result={'matrices':matrices,'geometry':geometry,'historicalLevel10Bounds':old,'overlap':overlap,'tiles':assets,'totalTileBytes':sum(r['bytes'] for r in assets),'referenceAssets':[{'file':p.name,'bytes':p.stat().st_size,'sha256':sha(p)} for p in (ROOT/'public/assets').iterdir() if p.suffix in ['.pdf','.jpg']]}
    output('geography-integrity.json',result);print(json.dumps({k:v for k,v in result.items() if k!='tiles'},indent=2))
def probes():
    urls=[f'https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/{z}/{row}/{col}.png' for z,row,col in [(11,814,2929),(12,1628,5858)]]
    urls.append('https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/Jezero%20Crater%20Color%20by%20Number%20-%20Final%20Version.pdf')
    def get(url):
        try:
            with urlopen(Request(url,headers={'User-Agent':'ARES-HUD local verification'}),timeout=35) as response:
                data=response.read();return {'url':url,'status':response.status,'contentType':response.headers.get('Content-Type'),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'signature':data[:8].hex()}
        except Exception as exc:return {'url':url,'error':str(exc)}
    result={'at':datetime.now(timezone.utc).isoformat(),'results':list(ThreadPoolExecutor(3).map(get,urls))};output('source-probes.json',result);print(json.dumps(result,indent=2))
def pdf():
    sys.path.insert(0,str(ROOT/'.browser-qa/pdf-tools'))
    import pymupdf
    document=pymupdf.open(ROOT/'public/assets/jezero-geology.pdf')
    for i,page in enumerate(document):
        page.get_pixmap(matrix=pymupdf.Matrix(1.7,1.7),alpha=False).save(OUT/f'usgs-educational-page-{i+1}.png')
        (OUT/f'usgs-educational-page-{i+1}.txt').write_text(page.get_text(),encoding='utf-8')
    print('Rendered local PDF:',len(document),'pages, SHA-256',sha(ROOT/'public/assets/jezero-geology.pdf'))
if __name__=='__main__':
    for command in sys.argv[1:] or ['links']:{'links':audit_links,'numeric':numeric,'probes':probes,'pdf':pdf}[command]()
