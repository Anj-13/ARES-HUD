"""One-off, explicit historical annotations and current navigation reconciliation."""
from pathlib import Path
import re
import json
import subprocess

ROOT=Path(__file__).resolve().parents[2]
def read(path):return (ROOT/path).read_text(encoding='utf-8')
def write(path,text):(ROOT/path).write_text(text,encoding='utf-8')
evidence='BASELINE_CLOSURE_REPORT.md'
annotations='''## Task 0D reconciliation annotations — rechecked 14 November 2026

- **[RESOLVED] H1 / missing NASA imagery:** 24 genuine local CTX tiles at levels 10–12, source manifest hashes and two NASA reference JPEGs verified. Fresh level-11/12 requests return 200 PNG. Challenge/team eligibility is a separate owner submission check.
- **[OPEN] H2 / public acceptance:** local Edge desktop/narrow/keyboard and static-build tests pass; public URL, deployed revision, private-window and physical-device acceptance remain unverified.
- **[RESOLVED] M1 / no-route UI:** original and React browser harnesses exercise a blocked grid/plan, show unavailable results, omit an active route and recover after reset.
- **[RESOLVED] M2 / identical-endpoint narrative:** browser-checked dust state says no detour is needed at an identical endpoint; other no-route/unchanged/detour states have conditional copy.
- **[RESOLVED] L2 / marker sizing:** every Hab/science native button measures 44 × 44 CSS px at desktop and 360 px; map projection checks pass after pan at three zooms.
- **[RESOLVED] L1 / stale handoff wording:** current README/STATUS identify the React working tree over real local Git history. No freeze tag, new commit or public deployment is invented.
- **[RESOLVED] Registered imagery / documentation baseline:** source matrix, 4 km sector, coordinates, distances, CTX/PDF comparison and local Markdown links rechecked. Eight/14/22/33-test and 16-tile claims below are historical only; current suite is 39 passing tests and cache is 24 tiles.
- **[OPEN] Numeric terrain / geology geometry:** no verified numeric DEM, slope, unit-to-grid overlay or operational safety model. The separately displayed USGS educational map is not a routing raster.
- **[UNVERIFIED] Original run metadata / official submission:** old timing, unavailable commit IDs, event portal, registration, official-guide and submission claims remain archival; fresh evidence does not retrospectively certify them.

Full finding-by-finding evidence, historical commit validation and comparison limits: [baseline closure report](BASELINE_CLOSURE_REPORT.md). [STATUS.md](../STATUS.md) alone records acceptance. The original record follows; its original present-tense statements and numeric results describe its historical revision.

'''
historical=['QA_REPORT.md','FIX_REPORT.md','TEST_REPORT.md','CHANGELOG.md','ARES_HUD_ONE_DAY_AUDIT.md','BUILD_TONIGHT.md','INTEGRATION_REPORT.md','RESOURCE_GAP_AUDIT.md']
for name in historical:
    path='docs/'+name;text=read(path)
    start=text.find('## Task 0D reconciliation annotations')
    if start>=0:
        end=text.find('The original record follows.',start)
        end=text.find('\n',end)+1
        text=text[:start]+annotations+text[end:].lstrip('\n')
    for finding in ['M1','M2','L2']:
        text=re.sub(r'(### (?:Medium|Low) '+finding+r'[^\n]*?)\[OPEN; see reconciliation evidence above\]',r'\1[RESOLVED; see current reconciliation evidence above]',text)
        text=text.replace('[OPEN: see reconciliation] '+finding,'[RESOLVED: current browser evidence] '+finding)
    if name=='CHANGELOG.md':
        marker='## Preserved historical changelog (unverified claims)'
        log=subprocess.check_output(['git','log','--format=%h %s (%ci)'],cwd=ROOT,text=True).strip()
        text='# Verified local Git history — re-read 14 November 2026\n\n'+ '\n'.join('- '+line for line in log.splitlines())+'\n\nNo new commit or tag was created in the reconciliation pass. Historical claims below are retained separately and validated in the baseline closure evidence.\n\n'+text[text.index(marker):]
    write(path,text)
# Historical records stay intact; an explicit top note disambiguates their epoch.
more=['AUDIT_CURRENT.md','TASK_0_REPORT.md','TASK_0D_REPORT.md','TASK_1_REPORT.md','ARCHITECTURE_PRE_REACT.md','FEATURE_IMPLEMENTATION_REPORT.md','MAP_RECOVERY_REPORT.md','DOCS_CHANGE_REPORT_V03.md','MAP_ARCHITECTURE.md','status-from-otheragent/README.md','status-from-otheragent/STATUS.md','status-from-otheragent/Opencode-DeepSeek-V4.1-flash-free-work.md']
for name in more:
    path='docs/'+name;relative='../' if '/' in name else ''
    note=f'> HISTORICAL SNAPSHOT — reviewed 14 November 2026. Original baseline/test/schedule/commit statements below are archival, not current acceptance. Reconciliation: [baseline closure report]({relative}BASELINE_CLOSURE_REPORT.md). Only [root STATUS.md]({relative}../STATUS.md) records current task acceptance. Old root application paths map to `legacy/` or the current `src/`/`public/` locations in the migration report.\n\n'
    write(path,note+read(path))
write('docs/MAP_ARCHITECTURE.md',read('docs/MAP_ARCHITECTURE.md').replace('> CURRENT DESIGN REFERENCE - checked by source inspection','> HISTORICAL DESIGN REFERENCE - checked by source inspection').replace('ARCHITECTURE.md#part-b-target-architecture--not-yet-implemented','ARCHITECTURE.md#part-a-current-implementation').replace('See [ARCHITECTURE.md Part B]','See [current architecture]'))
write('docs/status-from-otheragent/README.md',read('docs/status-from-otheragent/README.md').replace('../ARCHITECTURE.md#part-b-target-architecture--not-yet-implemented','../ARCHITECTURE.md#part-b-planned--gated'))
write('docs/assets/README.md','''# Asset register entry point

[DATA_SOURCES.md](../DATA_SOURCES.md) records exact source URLs, credits, deployed paths, retrieval evidence, sizes, hashes and scientific limitations. Deployed `assets/...` paths map to repository [public/assets/](../../public/assets/); vendored Leaflet is in [public/vendor/leaflet/](../../public/vendor/leaflet/). Original copies remain in `legacy/` for recovery.

Current verified cache: 24 CTX PNGs (two level 10, six level 11, sixteen level 12), 1,356,690 bytes total, each 256 × 256 px. Manifest: [trek/manifest.json](../../public/assets/trek/manifest.json). Also present: catalog/capabilities/source snapshots, the 3-page USGS educational PDF/service snapshot and two NASA reference JPEGs. The older 16-tile level-10 block is historical, not the current cache. No elevation raster is supplied.

The [baseline closure report](../BASELINE_CLOSURE_REPORT.md) documents the local-PDF/CTX comparison and fresh source/hash checks. Page 2 is the unit key; map drawings are on pages 1 and 3. No pixel-derived registration or geological safety inference is made. [STATUS.md](../../STATUS.md) alone records task acceptance.
''')
text=read('docs/DATA_SOURCES.md')
text=text.replace('All asset paths are repository-root-relative.','Preserved asset tables use deployed `assets/` and `vendor/` paths; repository files now have a `public/` prefix.')
text=text.replace('No numerical DEM, slope, georeferenced EVA sector or physical safety measurement is present.','The hypothetical grid is WMTS-registered. No numerical DEM, slope or physical safety measurement is present; registration does not validate sector placement or traversability.')
text=text.replace('## Phase 2: verified Mars Trek WMTS integration','## Historical Phase 2 acquisition: Mars Trek WMTS integration\n\n> Historical 16-tile acquisition record. Current 24-tile levels 10–12 inventory and hashes are above; old extent and cached-level statements below describe that earlier acquisition.')
text+='''

## Baseline closure source recheck — 14 November 2026

Fresh source probes at 21:37 UTC returned 200 `image/png` for level 11 row 814 column 2929 (58,137 bytes) and level 12 row 1628 column 5858 (55,135 bytes); both SHA-256 values equal the retained manifest. The original USGS educational PDF download also returned 200 `application/pdf`, 8,623,899 bytes, SHA-256 `d4d52e2bde4ec36cfc3a64091c5c7c4bd49b3e3f84add6db942cfac299bf3646`, identical to the local file. Point-in-time probes do not guarantee future service availability. Responses were hashed in memory; no new runtime dataset was installed.

All three local PDF pages were rendered and compared with the existing CTX contact tiles, current registered sector and THEMIS JPEG. Page 2 contains the unit key (NHjf1, NHjf2, Aeb), not a map sketch; drawings are on pages 1 and 3. Older claims of a page-2 sketch are corrected by the baseline closure report. Comparison confirms qualitative inlet/fan morphology only; no georeferencing transform for the educational PDF or THEMIS JPEG was derived, and no geological unit is assigned to a hypothetical waypoint.

Evidence and source-linked figure lineage: [BASELINE_CLOSURE_REPORT.md](BASELINE_CLOSURE_REPORT.md), [source probe JSON](qa/baseline-closure/source-probes.json), [local integrity/geometry](qa/baseline-closure/geography-integrity.json). PDF renders and raw contact-sheet screenshots are documentation evidence under `docs/qa/`, excluded from production assets.
'''
write('docs/DATA_SOURCES.md',text)

# Capture verifiable baseline facts, including every application module/HTML entry.
documents=list((ROOT/'docs').rglob('*.md'))+[ROOT/'README.md',ROOT/'STATUS.md',ROOT/'AGENTS.md']
hashes=sorted(set(re.findall(r'\b[0-9a-f]{7}\b','\n'.join(p.read_text(encoding='utf-8') for p in documents))))
history=[]
for value in hashes:
    check=subprocess.run(['git','cat-file','-t',value],cwd=ROOT,capture_output=True,text=True)
    if check.returncode!=0 and not re.search('[a-f]',value):continue  # Reject seven-digit measurements, not commit claims.
    history.append({'id':value,'type':check.stdout.strip() if check.returncode==0 else None,'verifiedLocalObject':check.returncode==0})
facts={'head':subprocess.check_output(['git','log','-1','--format=%H %s %ci'],cwd=ROOT,text=True).strip(),'gitStatus':subprocess.check_output(['git','status','--short'],cwd=ROOT,text=True),'trackedFiles':subprocess.check_output(['git','ls-files'],cwd=ROOT,text=True).splitlines(),'historicalCommitClaims':history,'modules':[]}
for directory in ['src','scripts','tests','legacy','react-ui-handoff']:
    for p in (ROOT/directory).rglob('*'):
        if 'node_modules' in p.parts or not p.is_file() or p.suffix not in ['.js','.jsx','.mjs','.html']:continue
        text=p.read_text(encoding='utf-8')
        facts['modules'].append({'file':p.relative_to(ROOT).as_posix(),'exports':re.findall(r'export\s+(?:async\s+)?(?:const|let|var|function|class)\s+(\w+)',text)+(['default'] if re.search(r'export\s+default\b',text) else []),'imports':re.findall(r'(?:from\s+|import\s*)[\"\']([^\"\']+)[\"\']',text),'htmlScripts':re.findall(r'<script[^>]*\bsrc=[\"\']([^\"\']+)',text) if p.suffix=='.html' else []})
(ROOT/'docs/qa/baseline-closure/repository-facts.json').write_text(json.dumps(facts,indent=2,ensure_ascii=False),encoding='utf-8')
print('Historical annotations, 3 broken link targets, source paths and asset inventory reconciled.')
