# ARES-HUD status

## React UI migration — 14 November 2026 (latest acceptance)

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


Only this file records migration completion. Audited 14 November 2026 against `0036eac` plus uncommitted tablet, timeline, reconnaissance, browser-harness and documentation changes. No commit, staging, deployment or submission authorized in this pass.

## Verified baseline

`npm.cmd test`: 33 passed, 0 failed (8 routing, 5 mission, 9 geographic, 5 plan, 3 Sol, 3 reconnaissance). `node --check`: 27 JavaScript/MJS files passed, excluding local browser caches. Edge desktop, 360px and reduced-motion runs: 81/81 each; see docs/FEATURE_IMPLEMENTATION_REPORT.md. Manifest: 24 local tiles, 1,356,690 bytes; all SHA-256 values match. Current local Leaflet version: 1.9.4.

| Capability | Status | Evidence |
| --- | --- | --- |
| Leaflet Mars CRS and registered surface planner | VERIFIED | Node geometry tests and browser CRS/projection checks |
| Deterministic mission routing, dust, return, no-route UI | VERIFIED | Browser harness and Node tests |
| Cached Trek imagery | VERIFIED | File hashes, browser decode and fresh HTTP 200 probes |
| USGS geology and rover context | REPORTED | Existing local PDF/JPEG and source register; not georegistered together |
| Tablet, timeline and simulated reconnaissance | VERIFIED | 33 Node tests plus 81 browser assertions in three configurations |
| Globe and numeric elevation | NOT IMPLEMENTED | Disposable globe spike only; coordinate/lifecycle checks incomplete; USGS DEM page HTTP 403 |
| Public deployment | NOT VERIFIED | No public URL checked |

## Migration targets

| Task | Status | Commit / evidence |
| --- | --- | --- |
| 0 Preflight | IN PROGRESS | Fresh numerical/network checks pass; visual CTX fan confirmed, PDF comparison not repeated |
| 0D Documentation baseline | IN PROGRESS | Missing entry points restored; historical reports retained; exhaustive link reconciliation outstanding |
| 1 Registered Leaflet map | IN PROGRESS | Code exists in `0036eac`; desktop/mobile revalidation in docs/AUDIT_CURRENT.md; no new commit |
| 3 Send to Tablet | DONE | Uncommitted at owner request; validation, independent route matching, hazard, return and no-route browser checks; QR/BroadcastChannel deferred |
| 2 Sol timeline | DONE | Uncommitted; eight excursions, interpolation, scrub/play/pause/speed/log; browser marker checks at 0/50/100%; optional mid-Sol events deferred |
| 6 Reconnaissance | DONE | Uncommitted; outline-only fog pane, deterministic knowledge/penalty tests and tablet snapshot matching |
| 7 Globe | IN PROGRESS | Disposable rendering spike only; full acceptance/coordinate checks and separate approval outstanding; no production globe or markers |
| 5 Terrain costs | IN PROGRESS | Investigation blocked by USGS HTTP 403; no numeric raster verified or cost integration; owner gate remains |

## Gaps

- RESOLVED: root README.md and STATUS.md were missing; restored in this pass.
- RESOLVED: reported app-boot failure did not reproduce on HTTP port 8011; desktop initially passed 49/49.
- RESOLVED: browser harness assumed fixed zoom 12 on narrow screens. Assertions now verify fitted sector bounds, cached tile level, reset and relative keyboard zoom.
- OPEN: full Task 0D historical/link reconciliation and PDF comparison are not certified complete.
- RESOLVED: local tablet workflow now browser-tested. OPEN: no public-host, physical phone or touch-device certification.
- Option 2 already selected: feature cutoff 15 November 13:30 GMT, data/dependency freeze 14:30, code freeze 16:00. No addendum edit needed.

## Local map recovery - 14 November 2026

Old servers on ports 8000/8011 closed requests without returning HTTP responses during this check. Fresh detached server on 127.0.0.1:8012 returns current assets with no-store headers. A fresh Edge screenshot confirms the registered map, NASA imagery, scale, Hab/stops, route and zoom controls render. Cache mismatch is a possible contributor to the user's screenshot, not a proven browser diagnosis.

Added serve.py for local development only; no production backend, dependency or data change. Node suite 22/22 passes; desktop and explicit 360px browser harness results recorded in docs/MAP_RECOVERY_REPORT.md. No commits/deployment. Earlier task acceptance gaps remain separate from this repaired local serving path.

## Latest implementation evidence

See [feature report](docs/FEATURE_IMPLEMENTATION_REPORT.md) and [gated investigations](docs/GATED_FEATURE_SPIKES.md). DONE above describes tested feature behavior; it does not close the separately listed historical documentation/release gates. No commits or deployment. No production dependencies or imagery changed. Timeline is a fixed simulated reference replay with a separately replanned reconnaissance candidate; no physical motion, real reconnaissance or safe EVA model.
