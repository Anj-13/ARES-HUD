# ARES-HUD status

Only this file records task acceptance. Latest implementation acceptance is from [baseline closure](docs/BASELINE_CLOSURE_REPORT.md) and [React migration evidence](docs/REACT_MIGRATION_REPORT.md), recorded 14 November 2026. This cleanup consolidates those accepted results; it does not rerun browser acceptance or promote a gated feature.

Latest UI verification: tablet navigation links use the shared button style; raw plan-URL field removed, with copy and direct navigation retained. Production Edge checks passed at 1440 and 360 px, including clipboard and nested-path navigation. `npm.cmd test`: 39 passed, 0 failed; production build: exit 0. Evidence: [tablet-buttons-report.json](docs/qa/tablet-buttons-report.json). This scoped UI check does not repeat the full browser suites or change existing release gates.

## Public deployment - 14 November 2026

Live application: [https://anj-13.github.io/ARES-HUD/](https://anj-13.github.io/ARES-HUD/), deployment confirmed by the owner. Fresh HTTP checks returned 200 for the entry page (ARES-HUD / Mission control), its referenced built JavaScript bundle, vendored Leaflet script and tablet.html. Entry response is text/html; JavaScript responses have script MIME types. See [request evidence](docs/qa/public-deployment-check.json). The entry references a built bundle rather than raw JSX. This verifies availability only: live route/tablet interactions, complete asset/network loading, deployed revision, private-window and physical-device acceptance remain unverified. The research browser could not open the site; direct Python HTTPS checks succeeded.

## Current baseline

Current HEAD inspected: `f707f92c334145a199500608fe8e9403416244fb` (14 November 2026, 21:41:45 GMT). Current source is the React/Vite application with pure mission engines and Leaflet 1.9.4. Git status at cleanup start shows documentation changes/untracked docs, not production-code differences; older reports' uncommitted wording describes their original pass, not a present code delta.

Fresh cleanup check: `npm.cmd test` passed **39 tests, 0 failed, 0 skipped/cancelled**, 2271.3069 ms. Counts: routing 8, mission 5, geography 9, plan 5, Sol 3, reconnaissance 3, mission-store/integrity 6. The suite checks all 24 current CTX tiles against manifest bytes/SHA-256. Cache: 1,356,690 bytes at levels 10/11/12 (2/6/16 tiles).

Previously executed browser/build evidence retained in the closure/migration reports: Edge desktop/360 px/reduced motion, 243 original browser assertions, 40 React development groups, 36 nested static-production groups, strict <=1 px map alignment at zooms 11/12/13, 4 km extents, 44 px controls, grid readout/bounds and tile/no-route recovery. These runs are retained evidence, **not rerun in this documentation-only cleanup**. No public deployment is inferred.

## Task acceptance

| Task / capability | Status | Evidence / boundary |
| --- | --- | --- |
| 0 Preflight | DONE | Closure: source matrices, point-in-time PNG/PDF probes, hashes, extent arithmetic and qualitative CTX/PDF comparison |
| 0D Documentation baseline | DONE | Closure: historical reconciliation, full inventory and path/anchor audit; later cleanup described in docs/README.md |
| 1 Registered Leaflet map | DONE | Closure: original Mars CRS retained in React, strict alignment/extent/cell/control checks and pointer grid/sector readouts |
| React/Vite integration | DONE | Migration: supplied components, original pure engines, independent tablet store, lifecycle and two-entry static build |
| 3 Send to Tablet | DONE | Migration/browser evidence: input-only validated snapshots, independent A*, local dust/return/reset and invalid/blocked plan states; QR/sync deferred |
| 2 Sol timeline | DONE | Eight simulated reference excursions; cost interpolation, scrub/play/pause/speed/log and marker checks; optional mid-Sol events deferred |
| 6 Simulated reconnaissance | DONE | Deterministic reveal/uncertainty tests and outline-only planning fog, reached-cell handoff; observed imagery remains visible |
| 7 Planetary globe | IN PROGRESS - investigation only | GATED_FEATURE_SPIKES.md: disposable renderer/texture spike; no production renderer, verified mission markers or full acceptance/owner go |
| 5 Terrain costs | IN PROGRESS - investigation only | Numeric DEM investigation blocked; no qualifying raster/slope/cost integration; separate owner gate remains |
| Public deployment | DEPLOYED - HTTP VERIFIED | Owner supplied live GitHub Pages URL; entry, built bundle, Leaflet and tablet entry returned HTTP 200; browser acceptance still pending |
| Official submission | NOT VERIFIED | No event portal/submission confirmation |

## Resolved local findings and remaining gaps

- RESOLVED locally: absent NASA imagery, unregistered surface grid, no-route UI coverage, identical-endpoint dust copy, marker sizing, grid-cell/bounds readouts and old Markdown-link issues. Evidence is in the closure report; fixes are not attributed to this cleanup.
- RESOLVED documentation drift: older 8/14/22/33-test, 16-tile, split-viewport and no-build summaries were superseded. Standalone historical docs are removed; originals remain in the [snapshot bundle](docs/qa/history/markdown-before-cleanup.zip), with [manifest](docs/qa/history/cleanup-manifest.json).
- OPEN: physical phone/touch, screen-reader and cross-browser acceptance, full live asset/network and owner-private-window checks, freeze revision/tag and official eligibility/submission/video.
- OPEN: globe coordinate conventions, landmark mapping, lifecycle/performance budgets and separate owner go/no-go; no numerical terrain integration or geology-to-grid identify.
- UNVERIFIED / intentionally not claimed: raw rover frame ID and photo at a hypothetical stop. USGS PDF page 2 is a unit key; drawings are pages 1/3. Neither PDF nor THEMIS is georegistered to the grid.
- MODEL LIMITS: Sol replay is a fixed simulated reference, reconnaissance replans a candidate from the reached cell, and all astronaut locations/costs/hazards/schedules/sensor effects are simulated, not operational telemetry or safety evidence.

## Release schedule and policy

Option 2: Sunday 15 November 2026, GMT (Europe/London): feature cutoff 13:30, dependency/data freeze 14:30, public deployment verification 15:15, final Git commit 15:45, code freeze 16:00. Submission is 23:59 in the verified event-local timezone, not automatically GMT. Video follows freeze. React + Vite is explicitly approved by addendum section 7; runtime remains static with no backend/external service. Globe/terrain gates are unaffected.

Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.
