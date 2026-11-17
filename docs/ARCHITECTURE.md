# ARES-HUD architecture

## Part A: Current implementation

The owner's React migration request authorizes a Vite build while preserving a statically hosted application. [STATUS.md](../STATUS.md) alone records acceptance. Earlier architecture and QA snapshots are preserved in the [historical evidence bundle](qa/history/markdown-before-cleanup.zip); the current design is described here and in the closure report.

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

### Current illustrative Globe

PlanetaryGlobe.jsx is lazily loaded by MapPanel under Suspense/error fallback. It imports the vendored Three.js r160 renderer; a deterministic 512 x 256 Canvas texture is original SIMULATED artwork, not NASA imagery. Pointer/keyboard/buttons rotate and zoom; Home resets. Explore Jezero returns to the retained Leaflet map and mission store. Rendering is on demand. Unmount cancels frames/listeners, disconnects observation, disposes geometry/material/texture/renderer and releases its WebGL context. Resource cleanup is source-inspected; sustained GPU/heap profiling remains unverified.

This reduced-scope feature is present in merge 3d20ff4. It provides no geographic registration, real rover markers, science layers or precision. See [illustrative feature evidence](HISTORY.md#simplified-globe-report). It does not replace the original scientific Task 7 acceptance gate.

## Part B: Planned / gated

The original NASA-textured, geographically registered globe and source-linked rover markers remain blocked on source metadata, projection/coordinate compatibility and permissions. No numerical elevation, derived slope or terrain-based safety inference is integrated. QR, synchronization, real-time telemetry, backend services and account flows remain absent. Public HTTP availability is checked; full live-browser/private-window and physical-device acceptance remain outstanding. See [STATUS.md](../STATUS.md).
