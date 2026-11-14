from pathlib import Path
import shutil
import json

root=Path(__file__).resolve().parent.parent
def read(p):return (root/p).read_text(encoding='utf-8')
def write(p,s):
    dest=root/p;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(s,encoding='utf-8')
shutil.copy2(root/'docs/ARCHITECTURE.md',root/'docs/ARCHITECTURE_PRE_REACT.md')
write('README.md','''# ARES-HUD

React + Vite mission interface integrated from `react-ui-handoff/`, with the original registered NASA map and mission engines. Acceptance and remaining release gates are recorded only in [STATUS.md](STATUS.md); see the [integration report](docs/REACT_MIGRATION_REPORT.md) for file moves, feature evidence and limitations.

## What runs today

The supplied layout, components, icons, typography and responsive breakpoints now drive real application state. Vendored Leaflet 1.9.4 owns the interactive Jezero map, Mars CRS, local NASA CTX tiles, scale, attribution, grid, markers and routes. Select and order hypothetical stops; calculate multi-stop A*, simulate arrival, insert dust, and plan Return to Hab. Telemetry uses the actual calculated route; unavailable routes show no metrics or invented fallback line.

Eight simulated Sol excursions use the original cost interpolation, playback and mission logs. Optional reconnaissance outlines unknown planning cells and penalizes uncertainty without masking observed imagery. The tablet validates input-only plan snapshots and independently recomputes routes; dust, return and reset are local to the tablet. Sources retains NASA/USGS credits, source notes, reference imagery, geology units and scientific limitations. Globe remains an explicitly unimplemented placeholder.

## Run and test

Node 24.22.1 and npm were used for verification. From the repository root:

```sh
npm ci
npm run dev
npm test
npm run test:browser
npm run build
npm run test:production
npm run test:legacy
```

The development server defaults to http://127.0.0.1:5173/. Start it before `test:browser`. Browser scripts use locally installed Microsoft Edge via Playwright Core. Production and legacy tests start and stop their own static test servers. Windows PowerShell may require `npm.cmd`.

For an ordinary static server after building: `python serve.py` serves `dist/` at http://localhost:8012/. `node scripts/static-server.mjs` is an alternative. Vite is build tooling only; production needs no Node server, backend, account, API key or external runtime service. NASA imagery is locally cached; no runtime NASA connection is needed.

## Repository and recovery

`src/components/` holds the supplied UI; `src/domain/` holds scientific and mission logic; `src/integrations/` adapts Leaflet/tablet; `src/state/` owns mission inputs and derived results. `public/` contains original assets, vendor files and generated source/license disclosures. Tests are in `tests/`; acquisition and QA tools are in `scripts/`; supporting documentation and QA evidence are in `docs/`.

`legacy/` preserves the original app, original tests, assets, vendor licenses, earlier UI and initial-files snapshots. Run `python serve.py --directory legacy --port 8013` for the old application. No dependency installation or build is needed for that recovery path. The supplied `react-ui-handoff/` and its pre-existing staged changes remain untouched. No commit or deployment was made during migration.

## Deployment

Upload only the contents of `dist/` to a static host after `npm run build`. Both `index.html` and `tablet.html`, local NASA tiles, vendor files, licenses and source notes are included. Relative paths support a nested deployment directory; browser QA serves the build under `/ares-hud/`. No public deployment or physical-phone verification is claimed.

## Sources, credits and limitations

[DATA_SOURCES.md](docs/DATA_SOURCES.md) retains original NASA/USGS URLs, retrieval evidence and asset hashes. NASA/JPL-Caltech/MSSS CTX via Mars Trek; NASA/JPL-Caltech/ASU/MSSS Perseverance imagery; NASA/JPL-Caltech/Arizona State University THEMIS imagery; Sun and Stack (2020), USGS SIM 3464 educational geology. No new imagery or scientific dataset was acquired. All 24 cached tile hashes match the original manifest.

Imagery is OBSERVED; coordinate arithmetic and route distances are DERIVED; geology is INTERPRETED; sector placement, EVA, costs, hazards, schedules and reconnaissance are SIMULATED. No elevation, slope, live telemetry or operational safety validity. Tablet handoff is a snapshot; a phone needs a reachable hosted URL. QR and synchronization remain deferred.

Application software is MIT licensed. React/React DOM are MIT; Lucide icons ISC; Leaflet BSD-2-Clause. [Third-party disclosures](docs/THIRD_PARTY.md) explain versions, purpose and license locations. Codex assisted integration and verification; prior implementation reports OpenCode/DeepSeek assistance.

**Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.**

## Documentation

[Navigation](docs/README.md) · [Status](STATUS.md) · [Architecture](docs/ARCHITECTURE.md) · [Migration report](docs/REACT_MIGRATION_REPORT.md) · [Owner rules](docs/AGENT_RULES_ADDENDUM.md).
''')
status='''## React UI migration — 14 November 2026 (latest acceptance)

This section supersedes earlier statements that React/Vite was deferred. The owner's explicit integration request authorizes the build migration; static hosting, scientific provenance and separate globe/elevation gates remain in force. Baseline: `0036eac` plus the pre-existing staged handoff and working files. No changes were committed, staged, deployed or submitted by this integration pass. The supplied handoff's existing index entries were preserved.

| Capability | Status | Evidence |
| --- | --- | --- |
| Supplied React UI + maintainable Vite structure | DONE | Supplied JSX/CSS reused; production and development browser QA; two static HTML entries |
| Original Leaflet NASA map, coordinates, scale, markers, pan/zoom | DONE | Local tiles decoded at 256 px; geometry tests; original 81-check harness; new browser QA |
| Ordered A*, selection, arrival, dust, return, derived metrics | DONE | 39 Node tests, real UI controls and expected metrics; unchanged A* source |
| Eight-Sol timeline and simulated reconnaissance | DONE | Original pure modules, scrub/play/reduced-motion browser checks, reached-cell handoff tests |
| Validated independent React tablet | DONE | Isolated A* recomputation, hash validation, local hazard/return/reset, invalid and blocked plan tests |
| Fullscreen and React/Leaflet lifecycle | DONE | Same instance/centre/zoom through fullscreen and Globe; StrictMode cleanup and explicit unmount/remount tests |
| Sources and mission notes | DONE | Original metadata, source register, scientific limitations, local links and keyboard modal tests |
| Static production output | DONE | `npm.cmd run build`; production browser QA at `/ares-hud/`; no external runtime requests |
| Globe and numerical terrain | NOT IMPLEMENTED | Globe is the requested placeholder; no renderer, numerical elevation or slope integrated |
| Public host / physical touch devices | NOT VERIFIED | Headless desktop Edge viewport checks only; no public deployment |

Verification: original baseline 33/33 Node tests; migrated suite 39/39. Original browser harness: 81/81 each at desktop, explicit 360 px and reduced motion (243 checks). New React development QA: 10 groups each at 1440, 768, 360 and reduced-motion 360 (40 groups); production QA: 9 groups each (36 groups). Edge 157.0.4341.57, Windows, headless. All 24 CTX files retain their source manifest SHA-256 and byte counts. See [migration report](docs/REACT_MIGRATION_REPORT.md) and `docs/qa/` for durable JSON evidence and screenshots.

Known limits: no public-phone or physical touch-device certification, cross-browser certification, QR or real-time sync. Eight-Sol replay follows a fixed reference excursion; recon replans the remaining candidate from the reached cell rather than physically modeling movement. Release/submission gates and historical documentation reconciliation below remain separate from this migration. The legacy snapshot is retained for recovery.

'''
write('STATUS.md',read('STATUS.md').replace('# ARES-HUD status\n','# ARES-HUD status\n\n'+status,1))
write('docs/ARCHITECTURE.md','''# ARES-HUD architecture

## Part A: Current implementation

The owner's React migration request authorizes a Vite build while preserving a statically hosted application. [STATUS.md](../STATUS.md) alone records acceptance. The [previous architecture](ARCHITECTURE_PRE_REACT.md) and all older QA reports are historical snapshots.

| Location | Responsibility |
| --- | --- |
| `index.html`, `src/main.jsx`, `src/App.jsx` | Vite/React mission entry, supplied navigation and dialogs |
| `tablet.html`, `src/tablet-main.jsx` | Independent tablet entry, hash changes and invalid-plan UI |
| `src/components/` | Supplied MissionPanel, MapPanel, TelemetryPanel, Timeline, TabletView, SourcesView and Modal |
| `src/state/mission-store.js` | One authoritative desktop input store; derive route, before-dust comparison, metrics, timeline/recon and handoff inputs |
| `src/domain/pathfinding.js`, `mission.js` | Original deterministic A*, multi-leg accumulation and ordering; no Leaflet or React imports |
| `src/domain/geo.js`, `map-crs.js`, `sector.js` | Original Mars sphere, pure grid/coordinate arithmetic and hypothetical operating area |
| `src/domain/plan.js` | Original schema/checksum/base64url input-only snapshot validation |
| `src/domain/sols.js`, `fog.js` | Original eight-Sol cost interpolation and simulated knowledge/uncertainty |
| `src/domain/datasets.js` | Original verified NASA/USGS source records with corrected current tile/registration description |
| `src/integrations/map.js`, `sector-layers.js` | Original Leaflet factory and grid/hazard/route/marker builders with updated imports |
| `src/integrations/use-mission.js` | React subscription and timer lifecycle; cleanup clears playback interval |
| `src/integrations/tablet-bridge.js` | Validate a received plan and create an independent store that recomputes A* |
| `src/styles/main.css` | Supplied UI styling plus original map marker styles and scoped integration/accessibility additions |
| `public/assets/`, `public/vendor/` | Original NASA/USGS files and locally vendored Leaflet 1.9.4/license |
| `scripts/prepare-public.mjs` | Copy current provenance and runtime licenses into static production assets |
| `tests/`, `scripts/*qa.mjs`, `docs/qa/` | Original/new Node tests, browser regression drivers and durable evidence |
| `legacy/` | Recoverable original implementation, original browser harness, assets, tests, older UI and initial snapshots |

State changes flow from native React controls into the mission store, then through the original pure engines into a stable immutable snapshot read with `useSyncExternalStore`. There is one desktop store and an intentionally isolated validated tablet snapshot store. The tablet has no dependency on desktop result objects or metrics. Planner actions leave timeline preview; handoff pauses without enabling preview and sends inputs from the reached cell. Reset restores the initial desktop scenario or received tablet snapshot.

Leaflet exclusively owns surface projection, tiles, keyboard/touch, pan/zoom, scale and attribution. MapPanel creates it once per mount, updates overlays independently, observes container resizing and removes the map on cleanup. Fullscreen and Globe keep that same instance. Size changes call `invalidateSize()` and restore the captured geographic view to avoid fractional-pixel coordinate drift. There is no CSS-transform map navigation or second projection. Fog uses unfilled planning-cell outlines; observed imagery is never treated as unknown. Routes have no straight-line fallback when A* fails.

Vite builds two entries with relative URLs. Runtime files are under `dist/`, including local imagery, Leaflet, source notes and licenses. Build tooling is absent from the runtime. `serve.py` and the Node static server are optional local tools. The development-only browser hooks are removed by the production build.

## Part B: Planned / gated

The Globe button remains a placeholder. No 3D renderer, new globe dataset, numerical elevation or terrain-based safety inference is integrated. Those retain their separate verification and owner gates. QR, synchronization, real-time telemetry, backend services and account flows are absent. Public-host and physical-device verification remain outstanding; see [STATUS.md](../STATUS.md).
''')
write('docs/README.md','''# Documentation navigation

[Current overview](../README.md) · [Authoritative status](../STATUS.md) · [React migration report](REACT_MIGRATION_REPORT.md)

| Document | Role |
| --- | --- |
| [REACT_MIGRATION_REPORT.md](REACT_MIGRATION_REPORT.md) | Current directory tree, moved/reused/modified files, feature integration, verification and open limits |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Current React/store/Leaflet ownership and separately gated future work |
| [DATA_SOURCES.md](DATA_SOURCES.md) | Preserved source URLs, credits, manifests and scientific limitations |
| [assets/README.md](assets/README.md) | Asset register; original deployed paths now live under `public/` |
| [THIRD_PARTY.md](THIRD_PARTY.md) | Dependency purposes, pins, license locations and AI disclosure |
| [AGENTS.md](AGENTS.md), [AGENT_RULES_ADDENDUM.md](AGENT_RULES_ADDENDUM.md) | Operating rules; latest explicit React request overrides prior build deferral only |
| [FEATURE_PLAN.md](FEATURE_PLAN.md), [AGENT_TASKS.md](AGENT_TASKS.md) | Earlier feature plan/task prompts; plans are not acceptance evidence |
| [qa/](qa/) | Preserved original PNGs and current browser JSON/screenshot evidence |

All other audit, integration, fix, test, judging, acquisition and task reports are retained as historical requirements or evidence for their stated revision. They may refer to pre-migration root paths; use the migration map in the current report. `ARCHITECTURE_PRE_REACT.md` preserves the prior architecture. `status-from-otheragent/` remains historical and does not supersede root STATUS.md. No public deployment is claimed.
''')
for name in ['AGENTS.md','FEATURE_PLAN.md','AGENT_TASKS.md']:
    p='docs/'+name
    write(p, '> React migration update, 14 November 2026: the owner explicitly requested React + Vite integration using `react-ui-handoff/`. That request supersedes older build deferral statements here. Static hosting, existing algorithms, provenance, separate globe/elevation gates and release schedule remain applicable. Current architecture is in ARCHITECTURE.md; acceptance is recorded only in ../STATUS.md.\n\n'+read(p))
write('docs/AGENT_RULES_ADDENDUM.md',read('docs/AGENT_RULES_ADDENDUM.md')+'''

## 7. Explicit React integration request — 14 November 2026

The owner explicitly requested integration of the supplied `react-ui-handoff/`, migration to React + Vite, a maintainable `src/`/`public/`/`tests/` layout, recoverable original implementation, original functionality and regression verification. This supersedes section 3 rule 1's build deferral and permits the supplied React, React DOM, Lucide icons and Vite build tooling. The built application remains statically hostable without a backend or runtime external service. Pinned browser test tooling is development-only. The globe remains a placeholder in this migration; no full renderer or numerical terrain integration is authorized. Other provenance, schedule, accessibility and verification gates remain applicable. See THIRD_PARTY.md for dependency justification and ../STATUS.md for evidence.
''')
write('AGENTS.md',read('AGENTS.md').replace('Preserve the static no-backend/no-new-build release policy. Earlier React/Vite migration is deferred pending explicit build approval under the latest request; see `docs/AGENT_RULES_ADDENDUM.md`.','The explicit React integration request now authorizes React + Vite; preserve static no-backend hosting, original mission engines and the recoverable legacy implementation. See `docs/AGENT_RULES_ADDENDUM.md` section 7.'))
write('docs/DATA_SOURCES.md',read('docs/DATA_SOURCES.md')+'''

## React migration path mapping — 14 November 2026

Original source URLs, retrieval dates, bytes and hashes above are preserved. Deployed `assets/...` files now reside at repository `public/assets/...`; `vendor/...` now resides at `public/vendor/...`. The recoverable legacy app retains its original copies. Manifests deliberately retain deployed `assets/...` paths. No new NASA/USGS asset was downloaded. All 24 CTX byte counts and SHA-256 values match; the acquisition script rehashed the cache with zero downloads. The current Leaflet map uses registered WMTS coordinates; historical statements about no registered sector describe earlier revisions. Registered hypothetical placement does not establish scientific safety or real EVA locations.

Source notes and third-party disclosures are copied into the production build; React/React DOM/Scheduler MIT and Lucide ISC licenses are included under `licenses/`. See THIRD_PARTY.md for pins and purposes.
''')
write('docs/assets/README.md',read('docs/assets/README.md')+'''

React migration location update: deployed `assets/` now maps to repository `public/assets/`; vendored Leaflet maps to `public/vendor/`. Original asset hashes, source credits and retrieval evidence are unchanged. Legacy copies remain under `legacy/` for recovery. No new scientific assets were acquired.
''')
write('legacy/README.md','''# Recoverable original implementation

This directory retains the pre-React static app, pure modules, original tests and browser harness, NASA/USGS files, Leaflet license, previous UI workspace (including its local ignored dependencies), and initial-files snapshot. `python ../serve.py --directory legacy --port 8013` from this directory is not the recommended command because the server resolves paths relative to its own location. From repository root run `python serve.py --directory legacy --port 8013`, then open http://localhost:8013/.

The original harness is browser-test.html; the root `npm run test:legacy` runs it in Edge at desktop, 360 px and reduced motion. Original Node tests can be run from this directory with `npm test`. This snapshot remains until the owner chooses to remove it. Acquisition/runtime assets are also in `../public/` for the React build. Old documentation links may refer to the historical root; current docs are in `../docs/`.

`migration-scripts/` contains historical one-time migration scripts for audit only. Do not rerun them against the migrated repository. No original UI, handoff, source asset or historical QA evidence was discarded.
''')
print('Current overview, status, architecture, rules, source notes and recovery instructions updated.')
