"""Record the reviewed migration evidence; retained as historical audit tooling."""
from pathlib import Path
import json
import shutil
import hashlib

root=Path(__file__).resolve().parents[2]
qa=root/'docs/qa';qa.mkdir(exist_ok=True)
for name in ['react-dev-report.json','react-production-report.json','legacy-migration-report.json']:
    data=json.loads((root/'.browser-qa'/name).read_text(encoding='utf-8'))
    assert not data.get('failures'),name
    if 'runs' in data:assert len(data['runs'])==4
    else:assert len(data['results'])==3 and all(r['result']=='PASS 81' for r in data['results'])
    shutil.copy2(root/'.browser-qa'/name,qa/name)
for width in [1440,768,360]:
    name=f'react-production-{width}.png';shutil.copy2(root/'.browser-qa'/name,qa/name)
shutil.copy2(root/'.browser-qa/react-production-360-reduced.png',qa/'react-production-360-reduced.png')
for name in ['finalize-layout.py','write-migration-docs.py']:
    source=(root/'scripts'/name).resolve();dest=(root/'legacy/migration-scripts'/name).resolve()
    assert source.is_relative_to(root) and dest.is_relative_to(root) and not dest.exists()
    print('Verified archival move:',source,'->',dest);shutil.move(str(source),str(dest))
report='''# React UI integration report — 14 November 2026

This report records implementation and executed checks. [STATUS.md](../STATUS.md) alone records migration acceptance. No public deployment, commit or submission was performed. The pre-existing staged `react-ui-handoff/` content was preserved without modification.

## Final directory tree

```text
mar-tian/
├── AGENTS.md                 operating-rule entry point
├── README.md                 current overview and commands
├── STATUS.md                 authoritative acceptance and release gaps
├── LICENSE
├── package.json
├── package-lock.json         pinned dependencies / reproducible install
├── vite.config.js            relative-path, two-entry static build
├── index.html                React mission-control entry
├── tablet.html               independent React tablet entry
├── serve.py                  optional static dist/ or legacy/ server
├── src/
│   ├── main.jsx
│   ├── tablet-main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── MissionPanel.jsx
│   │   ├── MapPanel.jsx
│   │   ├── TelemetryPanel.jsx
│   │   ├── Timeline.jsx
│   │   ├── TabletView.jsx
│   │   ├── SourcesView.jsx
│   │   └── Modal.jsx
│   ├── domain/
│   │   ├── pathfinding.js
│   │   ├── mission.js
│   │   ├── geo.js
│   │   ├── map-crs.js
│   │   ├── sector.js
│   │   ├── plan.js
│   │   ├── sols.js
│   │   ├── fog.js
│   │   └── datasets.js
│   ├── integrations/
│   │   ├── map.js
│   │   ├── sector-layers.js
│   │   ├── tablet-bridge.js
│   │   └── use-mission.js
│   ├── state/mission-store.js
│   └── styles/main.css
├── public/
│   ├── assets/               original NASA/USGS assets, 24 tiles, manifest
│   ├── vendor/leaflet/       unchanged 1.9.4 files, images and license
│   ├── docs/                 generated provenance/disclosures
│   ├── licenses/             generated runtime package licenses
│   └── LICENSE               generated application license copy
├── tests/
│   ├── pathfinding.test.js
│   ├── mission.test.js
│   ├── geo.test.js
│   ├── plan.test.js
│   ├── sols.test.js
│   ├── fog.test.js
│   └── mission-store.test.js
├── scripts/
│   ├── fetch-tiles.mjs
│   ├── vendor-leaflet.mjs
│   ├── prepare-public.mjs
│   ├── static-server.mjs
│   ├── browser-qa.mjs
│   └── legacy-qa.mjs
├── docs/
│   ├── README.md
│   ├── REACT_MIGRATION_REPORT.md
│   ├── ARCHITECTURE.md
│   ├── ARCHITECTURE_PRE_REACT.md
│   ├── DATA_SOURCES.md
│   ├── THIRD_PARTY.md
│   ├── assets/README.md
│   ├── qa/                   durable JSON, original and new screenshots
│   └── ...                   all prior operating rules/reports retained
├── legacy/
│   ├── README.md
│   ├── index.html, tablet.html, styles.css, package.json, serve.py
│   ├── app.js, mission-controls.js, tablet.js, exploration.js
│   ├── ...                   all other original modules/tests/harness
│   ├── assets/, vendor/      original assets and licenses for rollback
│   ├── UI/                   earlier UI workspace and ignored local modules
│   ├── initial-files/        original historical implementation snapshot
│   └── migration-scripts/    one-time historical tooling; do not rerun
├── react-ui-handoff/          owner-supplied scaffold, unchanged
└── dist/                     generated deployable static output, ignored
```

Generated profiles and intermediate browser output remain under ignored `.browser-qa/`; dependency directories and build output are not source files. Root supporting Markdown remains limited to the approved AGENTS/README/STATUS entry points. `.gitignore` now permits those entry points and `docs/` Markdown to be reviewed, rather than silently hiding new documentation. No staging or commit was performed; existing index entries were not replaced.

## Moved, reused and modified files

Every original flat application file was first copied into `legacy/`. Production uses the following audited mapping; originals remain recoverable there.

| Original | Current location / action |
| --- | --- |
| `pathfinding.js` | `src/domain/pathfinding.js`; unchanged pure A* |
| `mission.js` | `src/domain/mission.js`; unchanged mission legs and ordering |
| `geo.js` | `src/domain/geo.js`; unchanged pure grid/Mars math |
| `map-crs.js` | `src/domain/map-crs.js`; unchanged Mars sphere/CRS |
| `sector.js` | `src/domain/sector.js`; unchanged hypothetical sector/stops |
| `plan.js` | `src/domain/plan.js`; unchanged input schema/checksum validation |
| `sols.js` | `src/domain/sols.js`; unchanged eight-Sol interpolation |
| `fog.js` | `src/domain/fog.js`; unchanged reveal/uncertainty functions |
| `datasets.js` | `src/domain/datasets.js`; retained verified records, corrected stale tile-level/registration description |
| `map.js` | `src/integrations/map.js`; original factory, imports updated; local template supplied by React adapter |
| `sector-layers.js` | `src/integrations/sector-layers.js`; original overlay builders, imports updated |
| `app.js` | Saved in `legacy/`; DOM orchestration superseded by App/MissionPanel/TelemetryPanel and mission store |
| `mission-controls.js` | Saved in `legacy/`; original Sol/recon/handoff semantics adapted into store, Timeline, timer hook and tablet bridge |
| `tablet.js` | Saved in `legacy/`; original validation/independent planning/dust/return/reset behavior adapted into tablet bridge/store/view |
| `exploration.js` | Saved in `legacy/`; source cards, original geology unit notes/PDF and surface imagery adapted into SourcesView |
| `styles.css` | Original saved in `legacy/`; original marker styles reused with supplied `src/styles/main.css` |
| `index.html`, `tablet.html` | Originals saved in `legacy/`; replaced with Vite/React entries |
| Six root `*.test.js` | Original copies in `legacy/`; production tests in `tests/`, imports and static asset lookup paths adapted |
| `browser-test.html` | Original harness retained in `legacy/`, driven by `scripts/legacy-qa.mjs`; React QA is separate |
| `assets/`, `vendor/` | Byte-identical production copies under `public/`; originals retained under `legacy/` |
| `UI/` | Inspected earlier JSX/CSS scaffold, different from supplied handoff; moved to `legacy/UI/`, including local ignored dependencies |
| `initial-files/` | Inspected early grid implementation/tests/license; retained under `legacy/initial-files/` |
| `qa-screen.png`, `qa-regression.png` | Moved intact to `docs/qa/` |
| `scripts/fetch-tiles.mjs` | Domain imports and repository public paths updated; deployed manifest paths preserved |
| `scripts/vendor-leaflet.mjs` | Vendored output/inspection paths updated to `public/vendor/` |
| `serve.py` | Original retained in `legacy/`; root helper defaults to serving production `dist/`, with explicit recovery directory option |
| `package.json` | React/React DOM/Lucide runtime pins; Vite and Playwright Core development pins; build/test/serve scripts |
| `.gitignore` | Preserve existing cache/dependency ignores; expose approved docs; ignore generated production disclosures |
| `react-ui-handoff/src/` | Supplied components/CSS/main copied to `src/`; handoff itself unchanged. Demo state/data and illustrative terrain removed from production |

New implementation files: `src/state/mission-store.js`, `src/integrations/use-mission.js`, `src/integrations/tablet-bridge.js`, `src/tablet-main.jsx`, `vite.config.js`, `package-lock.json`, `tests/mission-store.test.js`, browser/static server/license preparation tools, current report and third-party disclosures. All supplied production components were wired; Modal's focus trap was repaired for initial dialog focus. CSS retains supplied layout, colors, fonts, breakpoints and icons, with Leaflet markers, layer controls, original position selector and persistent warnings added.

## Feature integration

| Feature | Actual integration and evidence |
| --- | --- |
| Mission selection / ordering | Original sector stops replace demo stops. Checkboxes, move buttons and marker selection drive one authoritative store. Traverse legs and per-stop costs come from original `planMission`; browser ordering/inclusion/metrics checks |
| A* / arrival | Original eight-direction A*, stable tie behavior and no corner cutting unchanged. Arrival requires a valid next-leg route, changes reached cell and deselects that stop. No partial or straight-line fallback |
| Telemetry | Actual route step count, modeled cost and Mars great-circle polyline length. Original simulated Hab/science position selector retained. Reset/return do not fabricate movement. Dust retains before/after paths and explains unchanged/identical-endpoint/no-route cases |
| NASA map | Live interactive Leaflet rendering of cached genuine CTX tiles, not a screenshot or CSS preview. Registered sector, original CRS/grid/markers, attribution, scale, keyboard pan/zoom and pointer coordinates retained. Layer visibility/opacity independent of routing |
| Fullscreen / Globe transition | One map instance across layout changes; `invalidateSize()` after resize and restore captured view to avoid drift. Globe remains explicit placeholder; no 3D renderer or new data |
| Timeline / logs | Original eight excursions, cost-based interpolation, scrub, play/pause, speeds, logs and final return to Hab. Reduced motion advances manually. Planner actions leave preview; no real-time Mars telemetry implied |
| Reconnaissance | Original reveal radius and uncertainty penalty; unfilled unknown-cell outlines. Imagery never masked as unobserved. Fixed replay route is distinct from the replanned remainder; labels and 1600-cell knowledge count shown |
| Tablet | Original schema/checksum validator accepts input-only snapshots. Independent isolated store recalculates A*, heading, route length and cost. In-page modal and direct `tablet.html#...` links; local dust/return/reset; invalid/blocked input tests |
| Sources / notes | Original four dataset records, full source register, exact credits, CTX layer, manifests, USGS unit selector/PDF, Perseverance and THEMIS context, traverse inspiration and limitations. Local source links tested under nested static deployment |
| Accessibility | Native controls, visible focus, range keyboard handling, Escape/Tab/Shift-Tab modal handling and focus restoration. Reduced-motion behavior and narrow layouts tested. No physical-device or screen-reader certification claimed |
| Lifecycle | StrictMode create/remove, explicit React unmount/remount, subscription cleanup, timer stop after unmount, repeated tablet mounts without runtime errors. Production-only build omits development hooks |
| Static release | Two Vite entries with relative URLs; local tiles/vendor/provenance/licenses. Tested from ordinary Node static server under `/ares-hud/` while external requests were blocked |

## Commands and actual results

| Command / check | Actual result |
| --- | --- |
| Initial `npm.cmd test` | 33 tests, 33 passed, 0 failed |
| Migrated `npm.cmd test` | 39 tests, 39 passed, 0 failed (all original assertions retained; six adapter/integrity tests added) |
| `npm.cmd test --prefix legacy` | 33 tests, 33 passed, 0 failed in recoverable original snapshot |
| `npm.cmd run test:legacy` | 81 checks each at 1440, explicit 360 and reduced-motion 360; 243 checks passed |
| `npm.cmd run test:browser` | 10 check groups each at 1440, 768, 360 and reduced-motion 360; 40 groups passed |
| `npm.cmd run build` | Exit 0; two HTML entries, shared JS/CSS and local public assets/licenses/source notes emitted |
| `npm.cmd run test:production` | 9 groups each at the same four viewport/motion settings; 36 groups passed under `/ares-hud/` |
| `node --check` | 28 current JS/MJS/config/test/tool files passed; JSX compiled by Vite |
| Pure-engine comparison | Eight domain engines equal original legacy files after newline normalization; A* public behavior unchanged |
| `node scripts/fetch-tiles.mjs` | 24 cached tiles, 1324.9 KiB; downloaded 0 new tiles, 0.0 KiB added |
| Asset integrity test | All 24 source manifest byte counts and SHA-256 match (1,356,690 bytes total CTX) |
| `git diff --check` | Exit 0; Windows newline conversion notices only |

Real browser: Microsoft Edge 157.0.4341.57 on Windows, headless. Browser scripts inspect decoded 256 px tiles, actual UI metrics and controls, independent tablet links, model results, no-route UI and map lifecycle. Their normal walkthroughs record no page errors or failed local assets; external network requests are blocked. The original harness deliberately requests missing tiles to exercise error handling. Do not interpret those expected 404s as a NASA outage. This migration renders the existing cached NASA service products; no claim is made about live external NASA uptime.

Vite reports expected notices about the intentionally external non-module vendored Leaflet script and its public CSS reference. Those files are copied unchanged into the build; the nested-path production tests verify they load, render and interact successfully. These notices are build diagnostics, not runtime missing assets.

Durable evidence: [development JSON](qa/react-dev-report.json), [production JSON](qa/react-production-report.json), [original harness JSON](qa/legacy-migration-report.json), [desktop screenshot](qa/react-production-1440.png), [tablet-width screenshot](qa/react-production-768.png), [mobile screenshot](qa/react-production-360.png), [reduced-motion screenshot](qa/react-production-360-reduced.png). Screenshots capture the state after the scripted walkthrough, not a claim about physical mission telemetry. Original QA images and older reports remain retained.

## Recovery stages

1. Read operating rules, all named modules, prior UI/historical/vendor/acquisition directories and supplied handoff. Record Git state and baseline 33 passing tests.
2. Snapshot all original implementation/test/asset files; keep the supplied handoff's staged changes intact. Copy pure engines and supplied visuals into the target structure.
3. Wire a single authoritative mission store and isolated validated tablet adapter. Verify 39 tests and React browser workflow before consolidating original paths.
4. Retain complete original static app with assets/vendor in `legacy/`; verify its original 33 tests and 81-check browser harness in all three configurations.
5. Build and test static output under a nested path, preserve licenses/source notes, record durable evidence and synchronize current documentation.

The last recoverable original implementation remains present. From repository root: `python serve.py --directory legacy --port 8013`. Production: `npm run build`, then `python serve.py`. For deployment upload only `dist/` contents. No historical app, source imagery, source license or original QA evidence was discarded.

## Remaining limits and owner decisions

- No public deployment, reachable phone URL, physical touch-device, Safari/Firefox, assistive-technology or submission certification. Desktop Edge viewport emulation is the evidence available.
- Globe stays a placeholder as requested; numerical elevation/slope and terrain-aware routing remain separately gated. No generated NASA-like terrain, invented route metrics or demo-state data is used by production.
- QR and BroadcastChannel/server synchronization remain deferred; URLs reproduce validated snapshots. A phone must reach the host; localhost refers to the phone itself.
- Timeline is a simulated cost-based reference replay, not physical elapsed time; recon replans a candidate remainder and handoff uses the last reached cell. No weather, suit, radiation or operational safety model exists.
- Historical reports retain their original revision-specific claims. Their old root paths map through the table above; this report and current architecture are navigation, and STATUS.md remains authoritative.
- No commits were made to avoid mixing the owner's pre-existing staged handoff with migration changes. All implementation changes are reviewable in the working tree; legacy copies remain intentionally until owner cleanup.

## Data, assets and documentation

Data classes remain visible: OBSERVED imagery, DERIVED coordinate/distance arithmetic, INTERPRETED geology and SIMULATED sector/stops/routes/costs/hazards/Sols/reconnaissance. No new scientific asset was acquired. Original source URLs, credits, retrieval evidence, bytes and hashes are preserved in DATA_SOURCES.md and the manifest. Full runtime license texts are copied into static output; see THIRD_PARTY.md. Codex assisted integration and verification; earlier work reports OpenCode/DeepSeek.

Updated documentation: root README/STATUS/AGENTS, docs navigation/current architecture, preserved prior architecture, owner addendum's explicit React build exception, plan/task context banners, source register path mapping, asset register, third-party disclosures, legacy recovery instructions and this report. Release schedule and other owner gates remain applicable. No demo video was created.
'''
(root/'docs/REACT_MIGRATION_REPORT.md').write_text(report,encoding='utf-8')
inventory=[]
for directory in ['src','public','tests','scripts','docs/qa']:
    for p in (root/directory).rglob('*'):
        if p.is_file():inventory.append({'file':p.relative_to(root).as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(qa/'migration-file-inventory.json').write_text(json.dumps(inventory,indent=2),encoding='utf-8')
print('Migration report, durable evidence and file inventory recorded.')
