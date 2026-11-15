# ARES-HUD

React + Vite mission interface integrated from `react-ui-handoff/`, with the original registered NASA map and mission engines. Acceptance and remaining release gates are recorded only in [STATUS.md](STATUS.md); see the [integration report](docs/REACT_MIGRATION_REPORT.md) for file moves, feature evidence and limitations.

## What runs today

The supplied layout, components, icons, typography and responsive breakpoints now drive real application state. Vendored Leaflet 1.9.4 owns the interactive Jezero map, Mars CRS, local NASA CTX tiles, scale, attribution, grid, markers and routes. Select and order hypothetical stops; calculate multi-stop A*, simulate arrival, insert dust, and plan Return to Hab. Telemetry uses the actual calculated route; unavailable routes show no metrics or invented fallback line.

Eight simulated Sol excursions use the original cost interpolation, playback and mission logs. Optional reconnaissance outlines unknown planning cells and penalizes uncertainty without masking observed imagery. The tablet validates input-only plan snapshots and independently recomputes routes; dust, return and reset are local to the tablet. Sources retains NASA/USGS credits, source notes, reference imagery, geology units and scientific limitations. Globe remains an explicitly unimplemented placeholder.

## Planned / gated work

Globe remains a placeholder; numerical elevation/slope, QR and synchronization retain their separate gates. The [public app](https://anj-13.github.io/ARES-HUD/) is deployed and HTTP-checked; full live-browser acceptance, physical touch devices and assistive technology remain unverified. Preflight, historical/local-link reconciliation, qualitative CTX/PDF comparison and registered-map revalidation evidence is in the [baseline closure report](docs/BASELINE_CLOSURE_REPORT.md); task acceptance is recorded only in STATUS.md.

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

The development server defaults to http://127.0.0.1:5173/. Browser scripts use locally installed Microsoft Edge via Playwright Core; each starts and stops its own test server. Windows PowerShell may require `npm.cmd`.

For an ordinary static server after building: `python serve.py` serves `dist/` at http://localhost:8012/. `node scripts/static-server.mjs` is an alternative. Vite is build tooling only; production needs no Node server, backend, account, API key or external runtime service. NASA imagery is locally cached; no runtime NASA connection is needed.

## Repository and recovery

`src/components/` holds the supplied UI; `src/domain/` holds scientific and mission logic; `src/integrations/` adapts Leaflet/tablet; `src/state/` owns mission inputs and derived results. `public/` contains original assets, vendor files and generated source/license disclosures. Tests are in `tests/`; acquisition and QA tools are in `scripts/`; supporting documentation and QA evidence are in `docs/`.

`legacy/` preserves the original app, original tests, assets, vendor licenses, earlier UI and initial-files snapshots. Run `python serve.py --directory legacy --port 8013` for the old application. No dependency installation or build is needed for that recovery path. The original `react-ui-handoff/` scaffold is optional and may be deleted; its [integration notes and removal boundaries](docs/REACT_MIGRATION_REPORT.md#handoff-folder-removal) are preserved independently of that folder. Historical reports record their original Git state; see STATUS.md for the current baseline. Public deployment is recorded in STATUS.md; live-browser acceptance remains separate.

## Deployment

Live app: **[https://anj-13.github.io/ARES-HUD/](https://anj-13.github.io/ARES-HUD/)**. Owner-confirmed deployment; fresh HTTP checks passed for the entry page, built JavaScript, Leaflet and tablet entry. See [STATUS.md](STATUS.md) for verification limits.

Upload only the contents of `dist/` to a static host after `npm run build`. Both `index.html` and `tablet.html`, local NASA tiles, vendor files, licenses and source notes are included. Relative paths support a nested deployment directory; browser QA serves the build under `/ares-hud/`. Full live-browser and physical-phone verification remain outstanding.

## Sources, credits and limitations

[DATA_SOURCES.md](docs/DATA_SOURCES.md) retains original NASA/USGS URLs, retrieval evidence and asset hashes. NASA/JPL-Caltech/MSSS CTX via Mars Trek; NASA/JPL-Caltech/ASU/MSSS Perseverance imagery; NASA/JPL-Caltech/Arizona State University THEMIS imagery; Sun and Stack (2020), USGS SIM 3464 educational geology. No new imagery or scientific dataset was acquired. All 24 cached tile hashes match the original manifest.

Imagery is OBSERVED; coordinate arithmetic and route distances are DERIVED; geology is INTERPRETED; sector placement, EVA, costs, hazards, schedules and reconnaissance are SIMULATED. No elevation, slope, live telemetry or operational safety validity. Tablet handoff is a snapshot; a phone needs a reachable hosted URL. QR and synchronization remain deferred.

Application software is MIT licensed. React/React DOM are MIT; Lucide icons ISC; Leaflet BSD-2-Clause. [Third-party disclosures](docs/THIRD_PARTY.md) explain versions, purpose and license locations. Codex assisted integration and verification; prior implementation reports OpenCode/DeepSeek assistance.

**Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.**

## Documentation

[Clean documentation index](docs/README.md) · [Status](STATUS.md) · [Architecture](docs/ARCHITECTURE.md) · [Migration report](docs/REACT_MIGRATION_REPORT.md) · [Owner rules](docs/AGENT_RULES_ADDENDUM.md).

Superseded standalone reports and other-agent snapshots have been removed from the active docs tree. Original text, timestamps and hashes are retained in the [evidence bundle](docs/qa/history/markdown-before-cleanup.zip) and [cleanup manifest](docs/qa/history/cleanup-manifest.json).

## Illustrative planetary overview
The Globe view now opens a lazy interactive stylized Mars sphere with original procedural artwork. Drag/touch or use arrow keys; +/? zoom and Home resets. Explore Jezero preserves the existing surface mission. This SIMULATED artwork has no geographic registration or real rover markers. Three.js r160 (MIT) is vendored and its licence ships with the application. See [report](docs/SIMPLIFIED_GLOBE_REPORT.md).
