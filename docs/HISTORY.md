# Project history

Consolidated 17 November 2026 after the owner reported that the project was submitted.
This document preserves ten former standalone reports and plans. Their dated findings,
checklists, schedules, instructions and future-tense statements are historical records,
not current commands, fresh test results or new authorizations. In particular, the old
midnight deadline was superseded by the owner addendum; the November 15 release
schedule is now past. Submission is owner-reported, not independently portal-verified.

Use [the project overview](../README.md) for current usage,
[STATUS.md](../STATUS.md) alone for acceptance,
[architecture](ARCHITECTURE.md) for current structure, and
[operating instructions](AGENTS.md) with the [owner addendum](AGENT_RULES_ADDENDUM.md)
for continuing constraints. [Sources](DATA_SOURCES.md) and
[software credits](THIRD_PARTY.md) remain separate build inputs.

## Reading the record

The original scientific NASA-textured globe investigation did not establish the
prerequisites for geographic mission markers. The later illustrative Globe is a
separate owner-approved procedural SIMULATED feature. Earlier reports describing a
placeholder or no public deployment describe their original revisions, not the final app.
Original report bodies are retained below with nested headings and repaired links;
raw QA files are unchanged. No code or scientific asset was changed by consolidation.

## Contents

- [FEATURE_PLAN.md](#feature-plan)
- [AGENT_TASKS.md](#agent-tasks)
- [BASELINE_CLOSURE_REPORT.md](#baseline-closure-report)
- [REACT_MIGRATION_REPORT.md](#react-migration-report)
- [GATED_FEATURE_SPIKES.md](#gated-feature-spikes)
- [GLOBE_IMPLEMENTATION_REPORT.md](#globe-implementation-report)
- [SIMPLIFIED_GLOBE_REPORT.md](#simplified-globe-report)
- [GITHUB_PAGES_DIAGNOSIS.md](#github-pages-diagnosis)
- [JUDGING_CHECKLIST.md](#judging-checklist)
- [CHANGELOG.md](#changelog)

<a id="feature-plan"></a>

## FEATURE_PLAN.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

> CURRENT SCOPE NOTE (15 November 2026): registered Surface Mode, tablet, timeline/recon and the reduced procedural illustrative Globe exist in current code; consult [STATUS.md](../STATUS.md) for acceptance. Planetary Mode requirements below describe the original NASA-textured/registered scientific vision, which remains blocked. The illustrative feature does not fulfill that scope.

> React migration update, 14 November 2026: the owner explicitly requested React + Vite integration using `react-ui-handoff/`. That request supersedes older build deferral statements here. Static hosting, existing algorithms, provenance, separate globe/elevation gates and release schedule remain applicable. Current architecture is in ARCHITECTURE.md; acceptance is recorded only in ../STATUS.md.

<a id="feature-plan--featureplanmd--ares-hud-v03-feature-plan"></a>

### FEATURE_PLAN.md — ARES-HUD v0.3 feature plan

**Team:** Martian · **Event:** NASA Space Apps 2026, *Interplanetary Survival Guide: Martian Map*
**Companions:** [AGENT_RULES_ADDENDUM.md](./AGENT_RULES_ADDENDUM.md) · [AGENT_TASKS.md](./HISTORY.md#agent-tasks)
**Status of this document:** planning only. Nothing here is implemented until the matching task in `AGENT_TASKS.md` is reported green with evidence. **Owner approved schedule Option 2:** Tier B may proceed after verified Tier A; Sunday 15 November 2026 at 16:00 GMT is the code freeze, with a 13:30 feature cutoff. See `AGENT_RULES_ADDENDUM.md` section 2.

---

<a id="feature-plan--1-vision-in-one-paragraph"></a>

#### 1. Vision in one paragraph

PLANNED v0.3: a two-scale Mars exploration and EVA demonstrator with original art and source/simulation labels. Planetary Mode would offer a rotatable, zoomable real Mars globe; Surface Mode would retain every v0.2 feature below: registered Leaflet Jezero CTX map, 40x40 hypothetical 4 km x 4 km sector, multi-stop A*, dust, Return to Hab, coordinates, scale, provenance, validated Send to Tablet, simulated Sol timeline and reconnaissance. This is not an implementation claim. React/Vite integration is explicitly approved by addendum section 7; current implementation evidence is in STATUS.md. This plan is not an acceptance register.

<a id="feature-plan--view-a-planetary-mode-task-7-separately-gated"></a>

##### View A: Planetary Mode (Task 7, separately gated)

Authentic NASA Mars Trek global imagery adapted to a pinned, locally vendored globe renderer would provide context. Source-linked Curiosity/Gale and Perseverance/Jezero markers require verified mission coordinates, coordinate conventions, epoch and metadata. Published historical traverses must be labeled and sourced; no invented current positions or tracks. NASA Eyes is an interaction goal only, not an API or interface to copy.

<a id="feature-plan--view-b-surface-mode-tasks-1-3-2-6-retained"></a>

##### View B: Surface Mode (Tasks 1, 3, 2, 6 retained)

Leaflet 1.9.x would remain the sole 2D viewport/projection owner for both mission control and tablet. Verified CTX imagery is OBSERVED; grid coordinates are DERIVED only after registration verification. Hypothetical astronaut positions, costs, hazards, schedules and sensors remain SIMULATED. Task 5 remains a separately gated numeric-elevation investigation.

<a id="feature-plan--transition-and-30-second-target-demo"></a>

##### Transition and 30-second target demo

Launch globe -> select a real rover for factual context or select the ARES-HUD EVA sector -> enter registered Jezero Surface Mode -> plan EVA -> Send to Tablet -> simulate dust/replan -> Return to Hab. Provide Return to Planetary Mode and preserve plan state. Rover context does not authorize creating a second EVA site; Curiosity's Gale route must never be overlaid on Jezero. No globe rendering is required on the tablet. Reduced motion uses an immediate view switch instead of animated descent. If Task 7 is unavailable, retain direct entry to the functioning 2D map and record the globe as NOT IMPLEMENTED. Record only features actually verified for the final demo.

<a id="feature-plan--2-current-baseline-reference"></a>

#### 2. Current baseline reference

See [STATUS.md](../STATUS.md) for current capabilities, test evidence and migration status. Owner-supplied schedule and v0.3 vision updates are policy inputs, not a new browser or deployment verification. This file specifies proposed work. Numerical findings below remain assumptions to verify in Task 0; they do not prove live tile availability or delta coverage.

<a id="feature-plan--findings-from-reading-the-files-verify-in-preflight"></a>

##### Findings from reading the files (verify in Preflight)

1. **Maximum zoom is level 12.** `assets/trek-capabilities.xml` declares TileMatrix levels 0-12 for `Jezero_CTX_BlockAdj_dd`. Level `L` has `2^(L+1)` columns by `2^L` rows of 256 px tiles; each tile spans `180 / 2^L` degrees; origin (-180, 90). Angular size per pixel is therefore `0.000687°` at level 10, `0.000343°` at level 11, `0.000172°` at level 12.
2. **Ground size per pixel (arithmetic, Mars 2000 sphere radius 3,396,190 m, so 1° latitude ≈ 59,275 m).** North-south ≈ 40.7 m/px at level 10, ≈ 20.4 m/px at level 11, ≈ 10.2 m/px at level 12. East-west is multiplied by cos(latitude) ≈ 0.95 near 18.4° N. The catalog's native 0.0001° (about 6 m) is **not** served beyond level 12 according to the capabilities file.
3. **Consequence for the grid.** At level 10 a 100 m cell is about 2.5 px, which is why zooming only blurs. At level 12 it is about 10 px, which is workable.
4. **The cached block probably misses the delta.** Level 10 rows 403-406 span about 18.46°N to 19.16°N and columns 1463-1466 span about 77.19°E to 77.87°E. The USGS SIM 3464 coverage recorded in `datasets.js` is 17.7-18.7°N, 76.8-77.8°E. The two overlap only in a thin northern strip, so the "delta sampling concept" stop is probably not on the delta. **Preflight Task 0 must confirm this by rendering and visual comparison before the sector is chosen.**
5. **A 4 km x 4 km sector is not square in equirectangular pixels.** East-west pixels are shorter on the ground than north-south pixels, so a 4 km square needs a longitude span of `4000 / (59,275 x cos(lat))` degrees and a latitude span of `4000 / 59,275` degrees.

<a id="feature-plan--3-feature-inventory"></a>

#### 3. Feature inventory

Priority key: **Must** (concept fails without it), **Should** (large value), **Stretch** (needs unverified data or time).

<a id="feature-plan--f7---3d-mars-globe-new-feature-spike-and-owner-gate"></a>

##### F7 - 3D Mars globe (new feature, spike and owner gate)

Depends on verified Task 1. Investigate a permissively licensed, pinned and vendored static renderer, preferably with explicit Mars radius/custom ellipsoid support. Verify global WMTS imagery/projection/texture compatibility, legitimate acquisition, offline asset size, coordinate alignment, WebGL/fallback and laptop performance in a 60-minute spike. No renderer is selected or installed by this plan. Full implementation requires separate owner go/no-go; cannot displace Tier A/B. Exact acceptance and stop rules: [Task 7](HISTORY.md#agent-tasks--task-7---3d-mars-globe).

<a id="feature-plan--f1--registered-map-must-tier-a"></a>

##### F1 — Registered map (Must, Tier A)

One pan/zoom surface in which imagery, grid, Hab, waypoints, hazards and routes share a single coordinate transform.

- Sector: a 4 km x 4 km lon/lat bounding box, 40x40 cells of 100 m, row 0 = north.
- `geo.js`: pure sector and grid maths only (`gridToLatLng`, `latLngToGrid`, `metersBetween`, bearing, tile-index helper for the download script). Unit-tested in Node. Leaflet owns projection to the screen (see ADR-1).
- Tiles for the sector cached at the best verified level (target 12) plus margin; served to a Leaflet tile layer from `assets/`.
- Lon/lat readout, scale bar in metres, layer toggles and opacity retained.
- Labels: imagery `OBSERVED`; coordinate mapping `DERIVED`; sector placement and Hab `SIMULATED / HYPOTHETICAL`.
- Why it matters: it turns NASA imagery from a backdrop into the surface the plan actually lives on, which addresses the **Relevance** criterion.

<a id="feature-plan--f2--mission-control-view-with-sol-timeline-should-tier-b"></a>

##### F2 — Mission-control view with Sol timeline (Should, Tier B)

- Ordered Sols (default 8), each with stops, a planned route and a short log entry.
- Scrubber + play/pause; trail of path traveled (solid) and future path (dashed).
- Readout: Sol, lon/lat, metres travelled, metres to Hab, modeled cost, current stop.
- Position inside a Sol is interpolated by cumulative modeled cost (stated as such).
- Hazard events can be pinned to a Sol; passing one triggers a replan and a log line.
- All content `SIMULATED`. Optional later idea: use Perseverance's published traverse as the "lone traveler" (access and format **not verified**).

<a id="feature-plan--f3--send-to-tablet-must-tier-a"></a>

##### F3 — Send to Tablet (Must, Tier A)

- Shared **plan object** (inputs only: sector id, Hab, stops, hazard flag, current position, schema version, checksum). The tablet recomputes routes with the same deterministic A*, which keeps the payload tiny and the two views consistent.
- Tablet view: ~360 px, high contrast, large type, local mini-map, heading arrow and distance to next stop, Return to Hab, Simulate dust hazard, modeled cost, no-route state.
- Handoff: (1) in-page slide-in animation; (2) URL-hash payload plus a locally generated QR code so a judge can open it on a phone from the public URL; (3) optional `BroadcastChannel` for two windows.
- Original visual design inspired by a wrist device; nothing copied from the film.

<a id="feature-plan--f6--fog-of-war-as-simulated-reconnaissance-should-tier-b"></a>

##### F6 — Fog of War as simulated reconnaissance (Should, Tier B)

- Planning knowledge layer, not an imagery mask. Cells are `UNKNOWN` or `REVEALED` by a **simulated sensor radius** around the astronaut's trail.
- `UNKNOWN` cells carry a configurable `SIMULATED` uncertainty penalty in A*; reveals trigger replans.
- Real orbital imagery stays visible. The fog only dims the planning overlay and shows uncertainty.
- Mandatory label: `SIMULATED RECONNAISSANCE — not real obstacle detection`.

<a id="feature-plan--f5--terrain-aware-cost-stretch-tier-c-gated"></a>

##### F5 — Terrain-aware cost (Stretch, Tier C, gated)

- Gate: identify a georeferenced elevation product (with horizontal resolution, vertical units, datum, nodata) that covers the sector. Search `assets/trek-catalog.json` first.
- If verified: offline script samples to the 40x40 grid, computes slope, writes `assets/derived/slope.json` with full metadata; slope layer labelled `DERIVED`; slope penalty added to A* in one documented module; route explanation splits cost into distance and slope.
- Thresholds (8° / 15° from the original brief) are **design assumptions**, configurable and labelled `SIMULATED / INTERPRETED`, never standards.
- If not verified: stop. Keep costs `SIMULATED`. Document the negative result; it is itself a valid Validity finding.

<a id="feature-plan--f4--geology-as-a-real-layer-optional-not-scheduled"></a>

##### F4 — Geology as a real layer (Optional, not scheduled)

Convert official USGS SIM 3464 GIS data (listed on the USGS publication page, doi 10.3133/sim3464; format and size **not verified**) to GeoJSON offline, reproject from Mars Transverse Mercator (central meridian 77.5° E, sphere radius 3,396,190 m) to lon/lat, draw polygons and support a point-in-polygon "unit under this stop" lookup. Remains `INTERPRETED`, with no traversability claim. Left out of this round by owner choice; kept here so the idea is not lost.

<a id="feature-plan--3a-architecture-decision-adr-1-leaflet-owns-the-viewport"></a>

#### 3a. Architecture decision ADR-1: Leaflet owns the viewport

**Decision.** One Leaflet map (1.9.x, pinned and vendored, BSD-2-Clause) is the only 2D viewport and projection for Surface Mode mission control and the tablet. A separately approved 3D renderer would own Planetary Mode only. The earlier plan to hand-write CSS pan/zoom is withdrawn.

**Why.** Pan, pinch, inertia, keyboard handling, tile loading, lat/lng-to-pixel projection, bounds, scale control and layer management are solved problems. Writing them again adds code to test and creates two coordinate systems that can drift. The tablet reuses the same factory, so both views agree by construction.

**Why my earlier objection was wrong.** An earlier draft rejected Leaflet because the Trek matrix was said not to match its default CRS. Reading Leaflet's `EPSG4326` definition suggests the opposite: its transformation gives a 2 x 1 tile world at zoom 0, the same as the Trek WMTS matrix, so Leaflet zoom equals the WMTS level. This is from reading the source, not from a run, so Task 1 step 1 proves it with browser checks before anything is built on it.

**Responsibilities.**

| Concern | Owner |
| --- | --- |
| Surface Mode pan, zoom, touch, keyboard, inertia, bounds | Leaflet |
| Surface Mode lat/lng <-> screen pixels, tile loading, scale control, attribution | Leaflet (custom CRS `MarsEQ`, R = 3,396,190 m) |
| Layers, panes, markers, vector overlays (canvas renderer for cells) | Leaflet, driven by `sector-layers.js` |
| Grid cell <-> lat/lng, metres, bearing, tile indices for the download script | `geo.js` (pure, Node-tested, no Leaflet import) |
| Routing | `pathfinding.js` and `mission.js` (never import Leaflet) |
| Plan serialisation | `plan.js` |
| Planetary rendering / global texture / mission markers | Task 7 renderer and data modules, only after separate approval |

**Costs and risks.** One new vendored dependency (about 42 KB gzipped, to be confirmed); a custom CRS to verify; canvas overlays are not keyboard-focusable, so markers are `divIcon` buttons; existing `browser-test.html` checks that target the old explorer must be rewritten. **Stop rule:** if the CRS checks fail after 20 extra minutes, report to the owner. Do not silently fall back to a hand-written viewport.

<a id="feature-plan--4-data-class-map"></a>

#### 4. Data-class map

| Item | Class | Note |
| --- | --- | --- |
| CTX orbital tiles | OBSERVED | NASA/JPL-Caltech/MSSS via Mars Trek |
| Grid-cell lon/lat | DERIVED | arithmetic from tile matrix and sector bbox |
| Sector placement, Hab, waypoints | SIMULATED | hypothetical, on real terrain |
| Hazards, costs, Sol schedule | SIMULATED | no physical model |
| Fog reveal radius, uncertainty penalty | SIMULATED | not sensor data |
| Slope (only if Task 5 passes) | DERIVED | from verified elevation, coarse |
| Slope thresholds / penalties | SIMULATED or INTERPRETED | assumptions, not standards |
| Geology unit descriptions | INTERPRETED | USGS, paraphrased |
| Perseverance image PIA24485 | OBSERVED | regional context only, not at a waypoint |

<a id="feature-plan--5-plan-object-schema-shared-by-f2-and-f3"></a>

#### 5. Plan-object schema (shared by F2 and F3)

```json
{
  "schemaVersion": 1,
  "sectorId": "jezero-sector-1",
  "hab": {"x": 5, "y": 20},
  "current": {"x": 5, "y": 20},
  "stops": [{"id": "delta", "x": 34, "y": 20, "selected": true}],
  "hazard": false,
  "sol": 1,
  "labels": {"hab": "HYPOTHETICAL", "costs": "SIMULATED"},
  "checksum": "<hash of the fields above>"
}
```

Grid coordinates are authoritative. Lon/lat are computed from `sectorId`, never stored in the plan.

<a id="feature-plan--6-build-order-and-dependencies"></a>

#### 6. Build order and dependencies

```
Task 0 Preflight ─► Task 0D Docs baseline ─► Task 1 Registered map (Leaflet) ─┬─► Task 3 Send to Tablet
                                           ├─► Task 2 Sol timeline ─► Task 6 Fog of War
                                           └─► Task 5 Terrain cost (gated spike first)
```

Task 3 depends on the plan object and geo helpers from Task 1. Task 6 depends on the trail from Task 2. Task 5 depends only on Task 1 but is gated on data. NEW Task 7 branches from verified Task 1: 60-minute verification spike -> separate owner go/no-go -> optional full implementation. Scheduling does not let Task 7 displace Tier A (0, 0D, 1, 3) or Tier B (2, 6). Task 5 remains separately gated.

<a id="feature-plan--7-risk-register-new-work"></a>

#### 7. Risk register (new work)

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Cached tiles do not contain the delta | High (by arithmetic) | High | Preflight confirms; download correct tiles |
| Level 12 tiles missing for the sector | Medium | High | Fall back to level 11; recompute cell pixel size; state limit in UI |
| Sector looks distorted (non-square) | Medium | Medium | Use cos(lat) scaling in `geo.js`; test corners |
| Leaflet CRS does not match the Trek matrix | Low | High | Step 1 spike with four browser checks; stop and report |
| Leaflet added late in the schedule | Medium | Medium | 45-minute spike; no fallback without owner approval |
| Docs drift from code | High | Medium | Task 0D, `STATUS.md`, addendum rule 14 |
| Tile layer or Trek unavailable at runtime | Low | Medium | Everything cached locally; failure message; routing independent |
| QR generation needs a library | Medium | Low | Fallback copyable URL; vendored MIT library only with LICENSE |
| Phone cannot reach the plan URL | Medium | Medium | Needs public host; keep in-page handoff as the primary demo |
| Fog misread as real detection | Medium | High | Mandatory label, tooltip, README note, never mask real imagery |
| Elevation product not available | High | Medium | Gate with a time-boxed spike; negative result documented |
| Globe data/renderer feasibility | Not established | High | Task 7 spike; preserve 2D if no legal global imagery, coordinate agreement, acceptable offline footprint or WebGL performance |
| Scope vs freeze | High | High | Tier policy in the addendum; revert to last green commit |
| Simulation credibility | Medium | High | Persistent labels and disclaimer on every view |

<a id="feature-plan--8-judging-alignment"></a>

#### 8. Judging alignment

| Criterion | Evidence this plan adds | Honest remaining weakness |
| --- | --- | --- |
| Impact | Local EVA planning loop with return-to-Hab | Concept stage, not operational |
| Creativity | Film-inspired mission-control → tablet handoff with original design; Sol timeline | Mini-maps and route planners exist; novelty is the integration |
| Validity | Tests for geo transforms, plan serialisation, determinism; clear labels | Costs are simulated; slope absent unless Task 5 passes |
| Relevance | Registered NASA CTX imagery as the surface the plan lives on; coordinates and metric scale derive from the tile matrix | No elevation or geology geometry unless Tasks 5 / F4 land |
| Presentation | One 30-second target flow: globe/context → registered map → traverse → tablet → dust/replan → return; direct 2D fallback | Must record only features that actually run |

<a id="feature-plan--9-open-questions-for-the-owner"></a>

#### 9. Open questions for the owner

1. **RESOLVED:** Option 2 selected. Sunday 15 November 2026, 16:00 GMT code freeze; 13:30 feature cutoff. Tier B approved after Tier A verification.
2. Is a real public URL available (GitHub Pages or other) so the QR / phone handoff can be demonstrated?
3. Should the Sol demo be a fully simulated mission, or later use Perseverance's published traverse (needs verification)?
4. Which permissively licensed renderer/version should be approved after the Task 7 spike? No candidate is selected by this document.
5. Does the owner authorize full Task 7 implementation after reviewing feasibility evidence, without displacing Tier A/B?
6. What limits apply to new dependency bytes, offline globe texture/download size and GPU memory? Spike must measure/report these; no acceptance ceiling is invented here.

<a id="agent-tasks"></a>

## AGENT_TASKS.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

> SCOPE NOTE: original Task 7 below remains the geographically verified NASA-textured acceptance target. The merged illustrative procedural Globe is a separately approved reduced scope (addendum section 8); its existence does not close scientific metadata/marker requirements. Existing accepted task status is only in STATUS.md.

> CURRENT EXECUTION CONTEXT: React + Vite is approved by addendum section 7. Use package.json commands and current src/domain/, src/integrations/, tests/ and public/ paths; original task paths describe pre-migration acceptance intent. Current acceptance is only in [STATUS.md](../STATUS.md); do not repeat accepted tasks. Historical reports referenced as literal examples below are available in the [snapshot bundle](qa/history/markdown-before-cleanup.zip).

> React migration update, 14 November 2026: the owner explicitly requested React + Vite integration using `react-ui-handoff/`. That request supersedes older build deferral statements here. Static hosting, existing algorithms, provenance, separate globe/elevation gates and release schedule remain applicable. Current architecture is in ARCHITECTURE.md; acceptance is recorded only in ../STATUS.md.

<a id="agent-tasks--agenttasksmd--paste-ready-prompts-for-the-coding-agent"></a>

### AGENT_TASKS.md — Paste-ready prompts for the coding agent

**How to use:** give the agent one task at a time, in this order: **0 → 0D → 1 → 3 → 2 → 6**, and **5** only after its spike passes. Always start a task with the **Common header** below. **Schedule Option 2 is now approved:** Tier B Tasks 2 and 6 are authorized after Tier A is verified, subject to the Sunday 15 November 13:30 GMT feature cutoff. Task 5 remains separately gated. NEW Task 7 depends on verified Task 1: spike first, then separate owner go/no-go for full implementation; never displace Tier A/B. See `AGENT_RULES_ADDENDUM.md` section 2 for the 16:00 GMT freeze and release gates.

Companions: [AGENT_RULES_ADDENDUM.md](./AGENT_RULES_ADDENDUM.md) · [FEATURE_PLAN.md](./HISTORY.md#feature-plan)

---

<a id="agent-tasks--common-header-prefix-to-every-task"></a>

#### Common header (prefix to every task)

```
Read, in this order: AGENTS.md, AGENT_RULES_ADDENDUM.md, FEATURE_PLAN.md,
DATA_SOURCES.md, ARCHITECTURE.md, BASELINE_CLOSURE_REPORT.md, and STATUS.md
(once Task 0D has created it).

Obey AGENT_RULES_ADDENDUM.md sections 1-4 exactly, including the OWNER-APPROVED
Option 2 schedule: Sunday 15 Nov 2026 13:30 GMT feature cutoff and 16:00
GMT code freeze. Tier B is allowed only after verified Tier A; Task 5
implementation still requires separate owner approval. Where it conflicts with
AGENTS.md, the addendum wins for the approved items only. Static HTML/CSS/JS,
ES modules, a section-7-approved Vite build, no backend. Section 7 also approves
React/React DOM/Lucide and Vite; Leaflet remains
1.9.x vendored in public/vendor/leaflet/ (addendum rule 5); other new dependencies need
the justification the addendum requires. Keep pathfinding.js pure and all
existing tests green. Leaflet owns only Surface Mode/2D viewports (addendum rule 13); a separately approved Task 7 renderer would own Planetary Mode only. At the
end of every task update STATUS.md (addendum rule 14).
Never invent coordinates, elevation, rover metadata or provenance. Keep the
OBSERVED / DERIVED / INTERPRETED / SIMULATED labels visible. Original art only;
nothing from the film The Martian.

Run npm test and node --check on every changed file. Open the app in a real
browser (headless is fine) and extend browser-test.html where relevant. End
with the TASK REPORT in the addendum's format. Commit with "task-N: ..." when
green. If you hit the stop point, revert to the last green commit and report.
```

---

<a id="agent-tasks--task-0--preflight-verification-hygiene-no-new-features"></a>

#### Task 0 — Preflight (verification, hygiene, no new features)

Stop point: 45 minutes.

```
TASK 0: PREFLIGHT. Verify facts and fix hygiene. Do not add features.

A. VERIFY THE TILE LAYER (report numbers, do not assume)
1. Read assets/trek-capabilities.xml. List every TileMatrix level and its
   MatrixWidth/MatrixHeight for layer Jezero_CTX_BlockAdj_dd. Confirm the
   deepest level (expected: 12).
2. For levels 10, 11 and 12, compute tile size in degrees (180 / 2^L),
   degrees per pixel (/256) and metres per pixel using the Mars 2000 sphere
   radius 3,396,190 m (1 degree latitude = 2*pi*R/360). East-west metres per
   pixel = north-south value * cos(latitude). Put the table in the report.
3. Using the tile template in assets/trek/manifest.json, request one tile at
   level 11 and one at level 12 near 18.45 N, 77.45 E. Report HTTP status and
   whether a PNG was returned. If the network is unavailable, say so and stop
   this step; do not guess.
4. Compute the lat/lon bounds of the CURRENTLY CACHED block (level 10, rows
   403-406, cols 1463-1466): lat = 90 - row*(180/1024), lon = -180 +
   col*(180/1024). Compare with the USGS SIM 3464 coverage in datasets.js
   (17.7-18.7 N, 76.8-77.8 E). Report the overlap in degrees and as a share of
   the USGS extent.
5. Download level 11 or 12 tiles covering lat 18.2-18.7 N, lon 77.2-77.7 E
   (a contact sheet is enough, do not commit unless needed). Compare visually
   with assets/jezero-themis.jpg (PIA23386) and assets/jezero-geology.pdf page
   2. State whether the delta is visible and where. Label this "visually
   confirmed by the agent", not measured. Never register by pixel colour.

B. HYGIENE
1. Fix mojibake: replace every "?" that stands in for an em dash or other
   special character in index.html, app.js, datasets.js, DATA_SOURCES.md,
   RESOURCE_GAP_AUDIT.md and tests. Save as UTF-8.
2. Add .browser-qa/ to .gitignore. Do not delete the folder.
3. Fix QA findings M2 (dust narrative at identical endpoints) and L2 (science
   pin size) and add a test or browser check for each. Add a UI-level no-route
   check using an injected unreachable grid in browser-test.html (QA M1).
4. Documentation reconciliation is Task 0D. Here, only fix the mojibake
   characters in the markdown files; do not restructure README or ARCHITECTURE.

DELIVERABLE: the Task 0 report, the numbers from A1-A5, and the commit.
ACCEPTANCE: all existing tests pass; new checks pass; no "?" artefacts; the
report states clearly whether the cached block contains the delta and what
the deepest served level is.
```

---

<a id="agent-tasks--task-0d--documentation-baseline-current-implementation-vs-migration-target"></a>

#### Task 0D — Documentation baseline: current implementation vs migration target

Depends on Task 0. Documentation only; no application code, tests or assets change. Stop point: 45 minutes.

Why: README.md, ARCHITECTURE.md and several reports were written for earlier states of the repository and now contradict the code (for example ARCHITECTURE.md says no NASA asset loader exists and lists six files; README.md says eight tests; TEST_REPORT.md and QA_REPORT.md still report "NASA resource absent"). Readers cannot tell what runs today from what is planned.

```
TASK 0D: DOCUMENTATION BASELINE. (Historical task constraint: the later explicit
v0.3 owner request authorizes scoped addendum edits in a separate docs pass.)
Separate "what exists and runs today" from
"the migration target". Documentation only: do not change application code,
tests, assets or AGENT_RULES_ADDENDUM.md. If you find a code bug, list it in
the report; do not fix it here.

STEP 1 - ESTABLISH FACTS (run commands; do not copy from old docs)
- git log -1 --format="%h %s %ci"; git status --short; git ls-files.
- npm test: record total tests and pass/fail per test file.
- For every .js and .html file: one line on its responsibility and, for
  modules, its exports (grep export). Note which HTML files load which modules.
- Assets present: tile level, rows, columns, count, total size; PDFs; images.
- Which documented claims are stale: grep all .md files for "eight tests",
  "8 tests", "no NASA asset", "NASA resource absent", "placeholder", "four
  files", "pathfinding.js together", "H1", "af9ac9e", "not deployed".
Put these facts in a block at the top of your report.

STEP 2 - CREATE STATUS.md (single source of truth at the repo root)
Sections:
1. Baseline: commit hash, date, test count and result, how it was verified.
2. Current implementation. A table: capability | status (VERIFIED / REPORTED /
   NOT VERIFIED) | evidence (command output, file, browser check).
3. Migration target. A table with one row per item: Task 1 registered Leaflet
   map, Task 3 Send to Tablet, Task 2 Sol timeline, Task 6 Fog of War,
   Task 5 terrain cost. Columns: item | status (NOT STARTED / IN PROGRESS /
   DONE) | commit | evidence. Every row starts NOT STARTED unless git history
   proves otherwise.
4. Known gaps and open QA findings, each tagged OPEN or RESOLVED with evidence.
Rule stated at the top of STATUS.md: only this file may call a feature DONE;
other documents link here.

STEP 3 - RESTRUCTURE README.md
- Add a status banner under the title: current implementation phase, what is
  planned, link to STATUS.md.
- Sections in this order: What runs today (verified) | Planned migration (NOT
  implemented) | Run and test | Deployment | Sources, credits and limitations |
  Documentation index.
- Merge the appended "Phase 2 implemented upgrade" and "NASA integration
  verification" text into one coherent "What runs today" section. Remove
  duplicated or contradictory paragraphs. Keep: the prototype disclaimer, NASA
  and USGS credits, AI-assistant disclosure, MIT licence note.
- Correct: test count from the real run; the deployment file list (all JS
  modules and assets/, not only four files); public URL stays "none verified"
  unless you can verify one.
- Documentation index: every .md file with a label CURRENT or HISTORICAL and
  one line on its purpose.

STEP 4 - RESTRUCTURE ARCHITECTURE.md into two parts
Part A, Current architecture (as built, with baseline commit): full component
table including mission.js, datasets.js, exploration.js, mission.test.js,
browser-test.html, assets/; the three independent spaces (Trek explorer, USGS
reference, EVA grid); state and data flow including traverse mode, stops and
simulated arrival; the local NASA tile loader; limits.
Part B, Target architecture (migration, NOT implemented): Leaflet owns the
viewport (ADR-1 in FEATURE_PLAN.md); sector.js, geo.js, map.js, plan.js,
tablet, sols, fog, slope modules and their responsibilities.
Then a Migration map table: current file | target | action (keep / replace /
delete / new) | task. Label Part B clearly in its heading and first line.
MAP_ARCHITECTURE.md: add a banner saying it describes the current three-space
design and pointing to ARCHITECTURE.md Part B for the target.

STEP 5 - MARK HISTORICAL DOCUMENTS (add banners and tags; do not rewrite)
Files: QA_REPORT.md, FIX_REPORT.md, TEST_REPORT.md, CHANGELOG.md,
ARES_HUD_ONE_DAY_AUDIT.md, BUILD_TONIGHT.md, INTEGRATION_REPORT.md,
RESOURCE_GAP_AUDIT.md. Banner at the top of each:
"> STATUS: HISTORICAL - describes baseline <hash> on <date>. Superseded by
STATUS.md. Finding tags below were checked on <date>."
Next to each finding or gap in those files add [RESOLVED], [OPEN] or
[UNVERIFIED] with a short evidence note (for example QA H1 "NASA resource
absent": check against the Phase 2 tiles and tag accordingly; H2 deployment:
tag from README facts). Bring CHANGELOG.md up to date from git log only (list
actual commits; invent nothing). AGENTS.md: add ONE line at the top pointing
to AGENT_RULES_ADDENDUM.md as taking precedence for approved items; change
nothing else in it.

STEP 6 - CONSISTENCY CHECK (run and report results)
- No document other than STATUS.md says a target feature is DONE or
  implemented.
- grep shows no remaining "eight tests" or "NASA resource absent" outside
  historical banners and tags.
- Every relative markdown link resolves to an existing file.
- No "?" in place of dashes; all files UTF-8.
- Every statement you kept about current behaviour is backed by a command you
  ran or a file you read; otherwise label it REPORTED or NOT VERIFIED.

ACCEPTANCE: git diff --stat shows only .md files (and .gitignore if touched in
Task 0); STATUS.md exists; README and ARCHITECTURE have separate Current and
Target sections; every historical doc has a banner and finding tags; the
Task 0D report lists what you could not verify. Use git add -f for markdown.
```

---

<a id="agent-tasks--task-1--registered-map-on-leaflet-foundation"></a>

#### Task 1 — Registered map on Leaflet (foundation)

Depends on Tasks 0 and 0D. Stop point: 3.5 hours, of which the Leaflet spike (step 1) is 45 minutes.

Architecture decision (ADR-1 in `FEATURE_PLAN.md`): **Leaflet owns the Surface Mode viewport.** The target 2D implementation must have no custom CSS-transform pan/zoom or second screen-projection function. Task 7 is a separate, gated Planetary Mode renderer.

```
TASK 1: REGISTERED MAP ON LEAFLET. Replace the two disconnected maps (the
custom CSS tile explorer and the separate SVG grid) with ONE Leaflet map.
Leaflet owns the viewport: pan, zoom, touch, keyboard, tile loading,
lat/lng-to-screen projection and the scale bar. Do NOT keep or write manual
CSS-transform pan/zoom code, and do NOT write another function that converts
lon/lat to screen pixels. Every overlay is positioned by lat/lng through
Leaflet.

DECISIONS (record any change and why)
- Leaflet: latest stable 1.9.x release, exact version pinned, vendored in
  vendor/leaflet/ (leaflet.js, leaflet.css, LICENSE). No CDN, no plugins, no
  2.x or alpha builds. Record version, source URL, retrieval date, bytes and
  SHA-256 in DATA_SOURCES.md and README, and add it to the References draft.
  If the network is unavailable, STOP and ask the owner to supply the files.
- Custom CRS "MarsEQ" in map-crs.js: extend L.CRS.EPSG4326 with R = 3396190
  (Mars 2000 sphere radius, metres). Expectation to PROVE in step 1: Leaflet's
  EPSG4326 transformation makes zoom 0 a 2 x 1 tile world (512 x 256 px), the
  same as the Trek matrix (level L = 2^(L+1) columns x 2^L rows of 256 px
  tiles, origin -180, 90), so Leaflet zoom equals the WMTS level with no
  zoomOffset and Leaflet's y equals the WMTS row. Also confirm that the
  distance() method uses the R property in the vendored version.
- Local tile layer: template assets/trek/{z}/{y}-{x}.png, tileSize 256,
  noWrap true, minZoom 10, maxNativeZoom = deepest verified level (target 12),
  maxZoom = maxNativeZoom + 2 (show a visible notice when overzoomed),
  bounds = sector plus a one-tile margin, tileerror handler, attribution
  "NASA/JPL-Caltech/MSSS, via NASA Mars Trek".
- Sector: a 4 km x 4 km operating area as a lon/lat bounding box. Height in
  degrees = 4000 / 59275. Width in degrees = 4000 / (59275 * cos(lat_center)).
  Place it where Task 0 confirmed the delta is visible, with the Hab west of
  the delta and the science stop on or near it. Placement is SIMULATED /
  HYPOTHETICAL; the imagery under it is OBSERVED.
- Grid: 40 x 40 cells, 100 m nominal, row 0 = north, column 0 = west.
- geo.js stays, but is PURE sector and grid maths with no pixel projection:
  gridToLatLng, latLngToGrid, metersBetween (sphere R = 3396190), bearing, and
  tileIndex(lon, lat, level) used only by the tile download script. It does
  not import Leaflet. Leaflet does everything that involves the screen.

STEPS
1. LEAFLET SPIKE (45 min max; report the results, then continue).
   Vendor Leaflet, build MarsEQ, and add browser checks to browser-test.html
   (Leaflet needs a DOM, so these cannot be Node tests):
   a) zoom 0 world size is 512 x 256 px; point (lat 90, lng -180) projects to
      (0, 0) and (lat -90, lng 180) to (512, 256).
   b) At zoom 10 the NW corner of tile row 403, column 1463 (lat = 90 - 403 *
      180/1024, lng = -180 + 1463 * 180/1024) projects to pixel
      (1463*256, 403*256) within 0.01 px. Repeat for one point at zoom 12.
   c) crs.distance for 1 degree of latitude equals 59,274.7 m within 1 m.
   d) map.distance between two lat/lngs 4000 m apart (computed from geo.js
      maths) is 4000 m within 1 m.
   If any check fails, spend at most 20 more minutes diagnosing. If it still
   fails, STOP and report. Do not fall back to CSS transforms or to another
   library without owner approval.
2. Create sector.js: sectorId "jezero-sector-1", bounding box, Hab and stop
   grid coordinates, and a short comment on how each number was chosen and
   what is simulated.
3. Create geo.js and geo.test.js (Node): grid<->lat/lng round trip, four
   corners and centre, 4000 m north-south and east-west spans within 1 m,
   bearing, tileIndex for known points at levels 10, 11, 12.
4. Create scripts/fetch-tiles.mjs (Node, idempotent) that downloads only the
   tiles covering the sector plus a one-tile margin at the deepest verified
   level (and coarser levels only if needed) into assets/trek/{z}/{row}-{col}.png.
   Extend assets/trek/manifest.json with level, URL, bytes and SHA-256. Report
   total added size.
5. Create map.js exporting createSectorMap(element, options) used by BOTH
   mission control and the tablet (Task 3). It builds the Leaflet map with
   MarsEQ, keyboard handling on, maxBounds = sector plus margin
   (maxBoundsViscosity 1), zoomSnap 0.5, and these panes (z-index): tiles 200,
   grid 410, hazards 420, fog 430, routes 450, markers 600. Use the canvas
   renderer for grid, hazard and fog cell layers.
6. Create sector-layers.js: drawGrid (gridlines as one multi-polyline),
   drawHazards(grid), drawRoute(path, style) with dashed style for the
   pre-hazard route, drawMarkers (Hab, stops, astronaut). Markers are L.marker
   with L.divIcon containing a native button, keyboard true, with aria-label.
   These modules never import pathfinding.js; app.js passes data in.
7. Readouts: on mousemove show lat/lng (DERIVED) and the grid cell; add
   L.control.scale({imperial:false}); show the sector bounding box and cell
   size in metres.
8. Layer manager: toggles and opacity call Leaflet layer add/remove or
   setOpacity. Hiding hazard shading must never unblock cells (existing
   behaviour).
9. Reduced motion: if prefers-reduced-motion is set, disable zoomAnimation,
   fadeAnimation, markerZoomAnimation and inertia.
10. Remove the old viewport: delete the custom pan/zoom code and #tiles in
    exploration.js, tileCoordinate in mission.js (and any test of it), and the
    SVG grid drawing in app.js. Move PIA23386 (THEMIS) to Sources only. Update
    browser-test.html so the existing intents (tiles decode, zoom, pan, reset,
    missing-tile fallback, routing after asset failure, hazard, return) are
    tested through the Leaflet map.
11. Labels: imagery OBSERVED; grid-cell lat/lng DERIVED; sector, Hab, stops,
    hazards, costs SIMULATED.
12. Documentation: update STATUS.md (Task 1 row), move the Leaflet map from
    ARCHITECTURE.md Part B to Part A only after it is verified, and update
    DATA_SOURCES.md and README.

ACCEPTANCE
- Spike checks a-d pass in browser-test.html.
- Code check (report the grep results): no CSS-transform pan/zoom code, no
  getBoundingClientRect-based map positioning, no lon/lat-to-pixel function
  outside Leaflet.
- After pan and zoom at three zoom levels, for Hab, one stop and one route
  vertex, map.latLngToContainerPoint(gridToLatLng(x, y)) matches the DOM
  marker centre (or the Leaflet layer point for canvas vertices) within 1 px.
- 4 km north-south and east-west extents each measure 4000 m within 1 m by
  map.distance.
- At the maximum native zoom a 100 m cell is more than 8 screen px wide
  (measure with latLngToLayerPoint).
- The delta is visibly inside the sector ("visually confirmed by the agent").
- tileerror shows a message and routing still works.
- All existing tests, geo.test.js and browser checks pass.
- Keyboard: arrow keys pan, plus and minus zoom, Tab reaches the Hab and stop
  markers with visible focus.
STOP POINT: 3.5 hours. If level 12 tiles are unavailable, use level 11, say so
in the UI and report, and continue.
```

---

<a id="agent-tasks--task-3--send-to-tablet"></a>

#### Task 3 — Send to Tablet

Depends on Task 1. Stop point: 2.5 hours.

```
TASK 3: SEND TO TABLET. Add a mission-control to wrist-tablet handoff with an
original design. No film assets, screenshots or recreated film UI.

PLAN OBJECT (plan.js, pure)
Implement exactly the schema in FEATURE_PLAN.md section 5: schemaVersion,
sectorId, hab, current, stops[], hazard, sol, labels, checksum. It carries
INPUTS only. The tablet recomputes routes with the same deterministic A*.
Functions: makePlan(state), serializePlan(plan) -> base64url string,
parsePlan(string) -> {ok:true, plan} or {ok:false, error}, validatePlan,
checksum (simple deterministic hash is fine; this is integrity, not security).
plan.test.js: round trip, tampered checksum rejected, wrong schemaVersion
rejected, out-of-range grid coordinates rejected, malformed base64 rejected,
oversized input rejected.

MISSION CONTROL
Add a "Send to Tablet" button. On press: build the plan from current state,
animate a tablet frame sliding in on the same page (respect
prefers-reduced-motion: no slide, just appear), populate it.

TABLET VIEW (tablet.html plus tablet.js, shared modules from Task 1)
- Layout around 360 px wide, high contrast, large type, original styling.
- Local mini-map: a second Leaflet map instance created by the same
  createSectorMap() factory as mission control (Task 1), restricted with
  maxBounds and centred on the astronaut; same overlay modules. No separate
  projection code.
- Heading arrow and distance to next waypoint in metres (geo.js), next stop
  name, modeled route cost labelled SIMULATED.
- Buttons: Return to Hab, Simulate dust hazard, Reset. Native buttons,
  keyboard operable, 44 px targets.
- Hazard on the tablet replans locally. Show the dashed pre-hazard route and
  the new solid route. If no route: show "NO ROUTE AVAILABLE" and draw nothing.
- Persistent disclaimer and data-class badges on the tablet too.

HANDOFF OPTIONS (no backend)
1. In-page slide-in (primary demo path).
2. "Open on phone": render the URL tablet.html#<serialized plan> and a QR
   code. Generate the QR locally. Either write a small encoder or vendor an
   MIT-licensed library in /vendor/ with its LICENSE and an entry in README;
   state which and why. If generation fails, show the URL with a Copy button.
   Note in the UI that a phone needs the public URL to open the link.
3. Optional: BroadcastChannel "ares-plan" so a second window updates live.
   Mark as optional; skip if time is short.

ACCEPTANCE
- Plan sent from mission control shows identical stops, Hab and route on the
  tablet (browser check compares both route paths).
- Opening tablet.html with a valid hash reproduces the plan; an invalid hash
  shows a clear error panel, never a crash or blank page.
- Dust hazard on the tablet changes only the tablet's route.
- Tablet usable at 360 px width with no horizontal scroll, keyboard reachable.
- plan.test.js and all existing tests pass; browser-test.html extended.
- Labels: plan fields HYPOTHETICAL/SIMULATED; imagery OBSERVED.
STOP POINT: 2.5 hours. Drop BroadcastChannel first, then QR (keep the Copy
URL), never the in-page handoff.
```

---

<a id="agent-tasks--task-2--sol-timeline-tier-b--owner-approved-after-verified-tier-a"></a>

#### Task 2 — Sol timeline (Tier B — owner approved, after verified Tier A)

Depends on Task 1. Stop point: 2 hours.

```
TASK 2: SOL TIMELINE. Let the user watch one hypothetical astronaut's
multi-day activity unfold on the registered map. All SIMULATED.

MODEL (sols.js, pure)
- mission.sols: ordered list of {sol, label, stops[], logEntry, hazardEvent?}.
  Default 8 Sols, one EVA each, built from the existing stops; every Sol
  starts and ends at the Hab.
- Route per Sol from planMission. Cumulative cost array per route.
- positionAt(sol, t) where t in [0,1] interpolates along the Sol's path by
  cumulative modeled cost (document that this is cost-based, not physical).
- A Sol is labelled "Sol" only; the legend may mention a Sol is about 24 h 39
  min as general knowledge. No clock, weather or telemetry.
- Optional hazardEvent {cells, atT}: when scrubbing past atT, replan the
  remainder and append a log line.

UI
- Scrubber with Sol and time, play/pause, speed (1x/2x/4x), keyboard operable
  (arrow keys step, space toggles play). Respect prefers-reduced-motion by
  defaulting to paused and stepping instead of animating.
- Trail: solid line for path traveled, dashed for future path (Leaflet
  polylines in the routes pane).
- Readout panel (SIMULATED badge): Sol, lon/lat (DERIVED), metres traveled,
  metres to Hab (straight geodesic AND route length), modeled cost, current
  stop, log entry.
- Mission log list with the current Sol highlighted.

TESTS (sols.test.js)
- positionAt deterministic; t=0 equals start, t=1 equals end.
- Every returned position lies on the planned path.
- Trail length equals cumulative route length up to t.
- Sol with hazardEvent produces a valid replanned path or a no-route state.

ACCEPTANCE: scrubbing to any Sol/time yields a deterministic position; trail
matches the route; end of the final Sol is the Hab; units labelled m/km;
SIMULATED shown; browser check scrubs three points and compares the marker.
STOP POINT: 2 hours. Drop speed control, then hazard events, never the
scrubber.
```

---

<a id="agent-tasks--task-6--fog-of-war-as-simulated-reconnaissance-tier-b--owner-approved-after-task-2"></a>

#### Task 6 — Fog of War as simulated reconnaissance (Tier B — owner approved, after Task 2)

Depends on Task 2. Stop point: 1.5 hours. Explicitly approved by the owner in the addendum.

```
TASK 6: FOG OF WAR. Implement it as SIMULATED RECONNAISSANCE on the planning
layer. It must never be presented as real detection and must never hide real
imagery as if it were unobserved.

RULES
- The orbital imagery is already OBSERVED for the whole sector. Do not mask
  or darken it. Fog applies only to the planning overlay: cells are UNKNOWN or
  REVEALED in the astronaut's simulated knowledge. Draw fog as a Leaflet layer
  in the fog pane (interactive false), above the grid and below the routes.
- Reveal rule (fog.js, pure): a cell is REVEALED if it lies within R cells of
  any point on the traveled trail (default R = 3, i.e. about 300 m, a
  SIMULATED sensor radius, configurable constant). Start state: only the
  Hab neighbourhood is revealed.
- Planning effect: UNKNOWN cells get an uncertainty penalty added to the A*
  cell penalty (default 0.5, configurable, SIMULATED). With the penalty set to
  0 the behaviour must equal the pre-fog behaviour exactly.
- Revealing new cells triggers a replan of the remaining route; log it in the
  mission log ("Reconnaissance revealed N cells; route updated").
- Mandatory visible label: SIMULATED RECONNAISSANCE - not real obstacle
  detection. Toggle "Fog of War" off by default in mission-control view, on in
  the Sol demo if the owner enables it. Add a short help text explaining the
  difference between real orbital coverage and simulated knowledge.
- Do not use fog to imply hidden hazards exist. Hazard cells remain explicit
  scenario inputs.

TESTS (fog.test.js)
- reveal set grows monotonically along the trail; deterministic.
- penalty 0 gives identical routes to before (compare with existing tests).
- with penalty > 0 and a known corridor, the planner prefers the revealed
  corridor when path lengths are comparable.
- reveal event causes a replan result that is valid or no-route.

ACCEPTANCE: label always visible when fog is on; real imagery never masked;
tests pass; accessibility: fog is conveyed by pattern or outline as well as
tone, not colour alone.
STOP POINT: 1.5 hours.
```

---

<a id="agent-tasks--task-5--terrain-aware-cost-tier-c-gated"></a>

#### Task 5 — Terrain-aware cost (Tier C, gated)

Depends on Task 1. The **spike (step 1) is time-boxed to 60 minutes** and must be reported to the owner before step 2 starts.

```
TASK 5: TERRAIN-AWARE COST, GATED.

STEP 1 - VERIFICATION SPIKE (60 minutes max, report then STOP)
Find out whether NASA Mars Trek (or another NASA/USGS source) provides an
elevation product that (a) covers the sector from sector.js, (b) can be
downloaded or fetched as numeric georeferenced data (not a rendered image),
and (c) documents horizontal resolution, vertical units, datum, projection
and nodata. Method: search assets/trek-catalog.json for entries with
elevation, topography, DEM, MOLA, HRSC or CTX-DEM in the label, category or
description whose bbox contains the sector; then check Trek's documented
tile/API pages for how to obtain them. Report for each candidate: name,
URL, resolution, coverage, access method, licence/credit, size.
If nothing qualifies, STOP. Do not use screenshots, shaded relief, image
brightness or hand-drawn elevation. Document the negative result in
DATA_SOURCES.md and RESOURCE_GAP_AUDIT.md and end the task.

STEP 2 - ONLY IF STEP 1 SUCCEEDS AND THE OWNER APPROVES
1. Offline script scripts/make-slope.js (or Python, state which) that samples
   the elevation to the 40x40 grid, computes slope (Horn/Sobel in metres on
   the sphere), and writes assets/derived/slope.json with metadata: source,
   resolution, method, units, date, sector id, limitations.
2. Resolution warning: if the DEM resolution is coarser than the cell size,
   say slope is smoothed and cannot represent astronaut-scale obstacles.
3. Add a slope penalty to the cell cost in one documented module (units,
   weights, rationale). Thresholds 8 and 15 degrees are design assumptions
   from the original brief, NOT validated standards; expose as configurable
   constants labelled SIMULATED/INTERPRETED. Weight 0 must reproduce the
   existing behaviour exactly.
4. Slope layer in the layer manager labelled DERIVED with legend and source
   card. Route explanation showing cost split: distance vs slope.
5. Tests: five spot-check cells against an independent calculation in the test
   file; flat-terrain case equals old behaviour; raising the weight changes
   the route in a constructed case.

ACCEPTANCE: UI states "derived from orbital elevation, coarse"; no claim of
safety or traversability; every number traceable to the source metadata;
all existing tests pass.
```

---

<a id="agent-tasks--task-7---3d-mars-globe"></a>

#### Task 7 - 3D Mars globe

NEW task; not part of Task 1 and never a replacement for the registered 2D map. Depends on **verified Task 1** in STATUS.md. Feature vision approved; full implementation is NOT authorized yet. Protect Tier A (0, 0D, 1, 3) and Tier B (2, 6) first. Task 5 has its own independent gate. This documentation pass does not start the spike.

<a id="agent-tasks--step-1---verification-spike-60-minutes-maximum-report-then-stop"></a>

##### Step 1 - verification spike (60 minutes maximum; report then STOP)

Start only if Task 1 is verified and the remaining A/B acceptance and release windows are protected. End by 13:30 GMT Sunday 15 November even if 60 minutes remain. Suggested budget: renderer/license/static-loading 15 min; imagery/capabilities/acquisition 20 min; browser/performance/fallback 20 min; evidence and owner recommendation 5 min. Do not turn this spike into production integration.

1. Compare candidate globe renderers from their official documentation/source and license. Prefer explicit Mars radius/custom ellipsoid support; verify coordinate conventions and radius units, not an Earth default. Propose an exact version, vendored files under vendor/<name>/, permissive LICENSE and justification; list uncompressed/compressed dependency bytes and any workers, WASM, fonts or other runtime assets. No CDN or new build step. No candidate or dependency is approved automatically.
2. Discover NASA Mars Trek GLOBAL imagery through the official WMTS documentation. Read each candidate's GetCapabilities XML: exact endpoint, layer identifier/title, style, TileMatrixSet and SupportedCRS, matrix levels/limits, bbox, origin, row/column counts, tile dimensions, ResourceURL and actual PNG/JPG extension. A Jezero mosaic is regional, not a global texture. Do not guess endpoints or infer availability from a layer name.
3. Determine whether an authorized single NASA-sourced equirectangular global texture is obtainable, or documented WMTS tile conversion is feasible. Verify usage conditions, credit, acquisition method, coverage (seams/poles/no-data), longitude direction/domain, latitude convention and renderer UV orientation. Document any resampling/conversion and source lineage. No illegal scraping, unbounded tile enumeration, Earth textures or synthetic NASA-like substitute.
4. Test browser CORS if acquisition requires browser fetch/canvas; record actual request origin/headers and pixel-read outcome. Server-side acquisition success does not prove browser CORS. Runtime must use local assets with no API key or network dependency. Report encoded bytes, decoded dimensions, estimated texture memory (including mipmaps) and total offline package size. Any unapproved size/licensing constraint is a stop, not permission to ship.
5. Run in a real browser on an identified typical laptop: browser/version, OS, CPU/GPU, viewport, WebGL version/MAX_TEXTURE_SIZE. Measure first usable load, drag/zoom responsiveness/frame rate, peak memory where observable (otherwise label not measured), repeated enter/leave behavior and context loss. Test a blocked/unsupported WebGL context and missing texture: show an honest unavailable message plus keyboard-accessible direct Surface Mode, never crash or show fake Mars. Record measured results for owner go/no-go; do not fabricate universal performance thresholds.
6. Verify alignment of source-linked reference points and texture seams; test reduced motion, keyboard controls, focus transfer and narrow layout (360 px minimum). Planetary renderer owns only its globe; Leaflet remains sole Surface Mode viewport owner. Dispose/pause the globe when hidden to avoid dual render loops. No 3D on tablet.
7. Report candidate matrix, exact citations, feasibility failures, acquisition/CORS evidence, offline/download/GPU budgets, laptop measurements, tests and proposed limits. Update Task 7 in STATUS.md with actual evidence only. **STOP for separate owner go/no-go** on renderer, dependency/assets and full implementation, even if all checks succeed.

<a id="agent-tasks--stop-conditions-and-fallback"></a>

##### Stop conditions and fallback

Stop at 60 minutes, the 13:30 cutoff, failed Task 1 prerequisite, risk to A/B, unavailable authoritative global imagery/coordinates, unclear license, incompatible projection/texture, unresolved CORS when required, unacceptable or unapproved footprint, no viable static renderer or failed browser/fallback checks. Preserve the functioning 2D map; record the globe as NOT IMPLEMENTED. Do not spend deployment/submission time debugging 3D. No feature/data/dependency work beyond 14:30; public check 15:15, final commit 15:45, code freeze 16:00 GMT. No full implementation without an explicit owner decision; implementation stop point/budget must be agreed in that decision.

<a id="agent-tasks--step-2---full-implementation-acceptance-only-after-owner-go"></a>

##### Step 2 - full implementation acceptance (ONLY after owner go)

- Rotatable/zoomable real Mars globe using verified NASA imagery; source links, exact credit and persistent disclaimer visible. Correct Mars radius/coordinate/texture mapping demonstrated; no Earth default silently accepted.
- Verified rover markers (Curiosity and Perseverance where evidence permits) with source-linked mission metadata, coordinate frame, epoch, and location type (landing site, published dated position, or historical traverse). Unknown current positions are not established; omit unverified markers/tracks. Real mission facts must remain distinct from SIMULATED astronaut elements. Never place a Gale traverse on Jezero.
- Selectable SIMULATED/HYPOTHETICAL ARES-HUD sector transitions to the existing registered Jezero Surface Mode; Return to Planetary Mode preserves the validated surface plan. Rover selection supplies context, not a new surface sector. Direct Surface Mode remains available without WebGL; tablet requires no 3D.
- Preserve multi-stop A*, dust reroute, emergency Return to Hab and no-route behavior; lon/lat, scale, provenance, validated Send to Tablet/local recomputation, and approved Sol/reconnaissance features remain intact. No routing from globe texture colors or geology.
- Keyboard-accessible rotation/zoom and equivalent focusable mission/sector list, visible focus and predictable focus after transitions; reduced-motion handling with no forced animated descent or auto-spin; responsive fallback at 360 px and desktop; no information conveyed by color alone.
- Real browser acceptance covers globe interaction, mission sources, transitions in both directions, asset failure, unsupported/lost WebGL, local/offline loading, tablet flow, memory/performance against owner-approved limits and zero unintended console/network errors. All existing Node and browser tests pass, with regression coverage for new transition/marker validation/fallback logic. Report exact browser/device evidence; no invented passes.
- Pin/vendor/license and justify every new third-party file; record actual asset URL, credit, retrieval date, bytes, SHA-256 and any conversion manifest in DATA_SOURCES.md. Static no-backend/no-build architecture preserved.
- Update STATUS.md with actual commit and evidence. Only STATUS.md may mark the feature DONE. Move verified architecture from Part B to A only after acceptance. Failed gate leaves 2D working and 3D explicitly NOT IMPLEMENTED.

---

<a id="agent-tasks--checklist-for-the-owner-before-accepting-a-task"></a>

#### Checklist for the owner before accepting a task

- [ ] Report is in the required format and says what was NOT verified.
- [ ] `npm test` output pasted; test count increased where expected.
- [ ] Opened in a real browser and clicked through the demo flow.
- [ ] No `?` characters where dashes belong; files are UTF-8.
- [ ] New assets recorded with source, credit, bytes, SHA-256.
- [ ] Labels visible: OBSERVED / DERIVED / INTERPRETED / SIMULATED.
- [ ] Disclaimer visible on every view including the tablet.
- [ ] Markdown committed with `git add -f`.
- [ ] Nothing from the film *The Martian* is included.
- [ ] STATUS.md rows updated with commit and evidence; no other document claims DONE.
- [ ] No new 2D screen-projection or CSS pan/zoom code outside Leaflet; any approved 3D renderer is confined to Planetary Mode.

<a id="baseline-closure-report"></a>

## BASELINE_CLOSURE_REPORT.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

> DOCUMENTATION CLEANUP NOTE: original report saved at 21:50 on 14 November 2026. The owner subsequently requested removal of superseded standalone Markdown. This report retains its executed findings; original report/index bytes and original timestamps are in the [snapshot bundle](qa/history/markdown-before-cleanup.zip) and [manifest](qa/history/cleanup-manifest.json). Historical Git/run claims below remain statements about the original pass.

<a id="baseline-closure-report--baseline-closure-report--tasks-0-0d-and-1"></a>

### Baseline closure report — Tasks 0, 0D and 1

Recorded 14 November 2026. [STATUS.md](../STATUS.md) alone records task acceptance. This report separates executed checks from unverified external release/submission items.

<a id="baseline-closure-report--facts-established-in-this-pass"></a>

#### Facts established in this pass

- Actual HEAD: `f707f92c334145a199500608fe8e9403416244fb Nov-14: the legacy with old html, css, js files 2026-11-14 21:41:45 +0000`. Prior code evidence at `0036eac`, plus later owner commits and the uncommitted React integration. No new commit, staging, tag, push or deployment was performed here.
- `git log -1`, `git status --short` and `git ls-files` were captured directly in [repository-facts.json](qa/baseline-closure/repository-facts.json). Existing working changes and historical records were preserved.
- Current suite: 39 tests, 39 passed, 0 failed: routing 8; mission 5; geography 9; plan 5; Sol 3; reconnaissance 3; mission-store/integrity 6. Historical counts of eight, 14, 22 and 33 are revision-specific evidence, not the present suite.
- Current CTX cache: 24 PNGs, 256 × 256 each, 1,356,690 bytes. Two level-10 tiles (rows 406–407, col 1464), six level-11 (rows 812–814, cols 2928–2929), sixteen level-12 (rows 1625–1628, cols 5856–5859). All byte counts and SHA-256 values match the original manifest.
- Reference assets: PDF 8,623,899 bytes; THEMIS JPEG 86,106 bytes; Perseverance JPEG 239,471 bytes. Their local hashes match the source register. No new production asset or dependency was added.
- Referenced historical commit objects checked: 16; unavailable IDs: none. Object existence is verified; historical run/timing associations remain **[UNVERIFIED]** rather than retrospectively certified. No replacement commit or past run was invented. Actual CHANGELOG history is regenerated from `git log`, with original narrative preserved separately.
- Every current/legacy/handoff JavaScript, JSX, MJS and HTML application/test/tool file outside dependency/generated caches is inventoried with exports/imports/entry scripts below and in repository-facts.json. Current ownership is also documented in ARCHITECTURE.md.

<a id="baseline-closure-report--task-0--source-matrix-extent-hygiene-and-visual-comparison"></a>

#### Task 0 — source matrix, extent, hygiene and visual comparison

The local WMTS capabilities document declares 13 matrix levels, 0–12, tile origin (-180, 90), 256 px tiles. Arithmetic was recomputed from the stored XML rather than copied from an old report:

| Level | Matrix width | Matrix height |
| --- | --- | --- |
| 0 | 2 | 1 |
| 1 | 4 | 2 |
| 2 | 8 | 4 |
| 3 | 16 | 8 |
| 4 | 32 | 16 |
| 5 | 64 | 32 |
| 6 | 128 | 64 |
| 7 | 256 | 128 |
| 8 | 512 | 256 |
| 9 | 1024 | 512 |
| 10 | 2048 | 1024 |
| 11 | 4096 | 2048 |
| 12 | 8192 | 4096 |

Mars 2000 sphere R = 3,396,190 m; east-west pixel lengths below use 18.51° N:

| Level | Degrees/tile | Degrees/pixel | m/pixel north-south | m/pixel east-west |
| --- | --- | --- | --- | --- |
| 10 | 0.17578125 | 0.0006866455078125 | 40.7007 | 38.5952 |
| 11 | 0.087890625 | 0.00034332275390625 | 20.3504 | 19.2976 |
| 12 | 0.0439453125 | 0.000171661376953125 | 10.1752 | 9.6488 |

The old level-10 block (rows 403–406, cols 1463–1466) spans 77.16796875–77.87109375 E and 18.45703125–19.16015625 N. Against the documented USGS sheet extent (76.8–77.8 E, 17.7–18.7 N), overlap is 0.63203125° longitude × 0.24296875° latitude, **15.356384% of that degree-space extent**. This describes the historical cache, not the current 24-tile sector cache and not a ground-area or safe-EVA claim.

Fresh point-in-time probes at 21:37 UTC:

| Asset | Response | Bytes | Integrity |
| --- | --- | --- | --- |
| NASA Trek level 11 / row 814 / col 2929 | 200 image/png | 58,137 | PNG signature; SHA-256 equals retained manifest |
| NASA Trek level 12 / row 1628 / col 5858 | 200 image/png | 55,135 | PNG signature; SHA-256 equals retained manifest |
| Original USGS educational PDF URL | 200 application/pdf | 8,623,899 | SHA-256 identical to local PDF |

Exact URLs, hashes and timestamps are in [source-probes.json](qa/baseline-closure/source-probes.json). The PDF source is the original [USGS educational download](https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/Jezero%20Crater%20Color%20by%20Number%20-%20Final%20Version.pdf), linked to Sun and Stack (2020), [SIM 3464](https://doi.org/10.3133/sim3464). These checks do not certify future NASA/USGS service uptime. Responses were hashed in memory; production assets were not replaced.

<a id="baseline-closure-report--pdf-comparison--performed-with-corrected-page-identification"></a>

##### PDF comparison — performed, with corrected page identification

The exact local three-page PDF (SHA-256 `d4d52e2bde4ec36cfc3a64091c5c7c4bd49b3e3f84add6db942cfac299bf3646`) was rendered and all three pages inspected. **Page 2 is the unit key, not a map sketch.** The line-map drawings are on pages 1 and 3. Earlier Task 0 wording describing a page-2 sketch is inaccurate; it is retained as historical evidence under a correction banner, not repeated as a fresh observation.

- [Page 1](qa/baseline-closure/usgs-educational-page-1.png): map drawing and landing ellipse. The ellipse is a historical landing-site uncertainty area, **not the crater rim**. The left-side inlet, branching/lobate fan edge, internal circular feature and surrounding floor provide qualitative context.
- [Page 2](qa/baseline-closure/usgs-educational-page-2.png): NHjf1 and NHjf2 describe delta/fan units; Aeb describes wind-transported bedforms. Existing application paraphrases were checked against this key. These are interpreted regional geology descriptions, not assigned units at simulated stops.
- [Page 3](qa/baseline-closure/usgs-educational-page-3.png): enlarged numbered educational map, printed rotated on the portrait PDF page; it supports the same fan/inlet context as page 1.
- [CTX contact sheet](qa/baseline-closure/ctx-level11-contact.png): the already cached 36 level-11 inspection tiles (rows 811–816, cols 2926–2931), raw tile order with north at top. The west-entering channel terminates in a lobate, layered fan, with a circular feature inside and crater floor to its east. Its qualitative morphology agrees with the educational map context. **Visually confirmed by the agent:** the fan is visible and the currently registered sector includes part of it; the older north-shifted level-10 cache clips its southern part.
- [Current registered map](qa/baseline-closure/registered-map-1440.png): sector grid crosses the layered fan margin. Placement remains hypothetical; neither this comparison nor the source labels establish safe traversability or exact geological unit membership for any stop.
- [THEMIS PIA23386](../public/assets/jezero-themis.jpg): visually inspected for broader rim/floor/fan context. Its lower contrast, image rotation and absent verified footprint prevent a confident point-for-point alignment with CTX. It remains a separate reference JPEG. This is an explicit comparison limit, **not an unperformed comparison**. No image-brightness or visual matching was used for registration.

The only surface registration remains the existing documented WMTS matrix. No PDF, THEMIS or geology-to-grid transform, numerical elevation or slope was introduced. Documentation figures are renders/screenshots of genuine existing sources, not generated terrain; credits: NASA/JPL-Caltech/MSSS via Mars Trek for CTX, NASA/JPL-Caltech/Arizona State University for THEMIS, Sun and Stack/USGS for educational map. Figure lineage, originals and hashes are retained.

<a id="baseline-closure-report--historical-qa-findings-individually-reconciled"></a>

##### Historical QA findings, individually reconciled

| Original finding/gap | Current tag | Fresh evidence / remaining limit |
| --- | --- | --- |
| H1: NASA resource absent | RESOLVED | 24 manifest-verified CTX images render on the registered map; source URL/hash probes and local JPEG/PDF provenance |
| H2: no browser/public acceptance | OPEN for public release; local browser portion RESOLVED | Current desktop/narrow/reduced-motion Edge and nested static build tests pass. No public URL, owner private-window acceptance or physical-device certification |
| M1: no-route UI untested | RESOLVED | Original/React browser harness blocked-grid/blocked-tablet tests show unavailable metrics and no active route; recovery tested |
| M2: misleading dust copy at identical endpoints | RESOLVED | Fresh focused browser check sets science position and dust; copy explicitly says identical endpoints need no detour |
| L1: stale Git handoff wording | RESOLVED for documentation | Current baseline and actual commit log recorded. Final freeze commit/tag and deployment remain separate release gates |
| L2: 32 × 44 px science marker | RESOLVED | All four marker buttons measure exactly 44 × 44 px at 1440 and 360 px; after pan at zoom 11/12/13 |
| Missing geographic EVA registration / metric distances | RESOLVED | Registered WMTS CRS, 4 km extent and pixel/marker/route measurements below; sector remains hypothetical |
| Cache likely misses delta / PDF comparison pending | RESOLVED | Current sector screenshot, contact sheet and actual PDF pages inspected; old cache overlap recomputed; page-number error corrected |
| Numeric DEM/slope / geological spatial identify | OPEN, explicitly gated | No qualifying numeric raster or registered geology geometry; no scientific costs fabricated |
| Raw rover frame ID / image at hypothetical stop | UNVERIFIED / intentionally not claimed | Published PIA24485 only; no raw-frame ID or stop/photo geolocation inferred |
| Worldview / Gale route resource use | RESOLVED as references only | No Earth data/API or real Gale traverse placed in Jezero; existing Sources retains the citation and limit |
| Historical eight/14/22/33 test counts / 16-tile cache / no-build / split viewport | RESOLVED as historical statements | Updated CURRENT/HISTORICAL document index, present 39 tests/24 tiles and React/static build evidence; historical numbers untouched |
| Original run timings / old missing commit IDs | UNVERIFIED | Unavailable objects listed above; no retroactive certification. Existing local HEAD/history read directly |
| Official guide, event eligibility, external offers, submission/video | UNVERIFIED owner release items | No portal/account, current offer audit or submission action; original policy/source records retained |

The eight requested historical audit/fix/test/changelog/build/integration/resource documents now carry current finding-by-finding annotations; original report bodies remain archival. Task reports, prior architecture/recovery reports and other-agent snapshots have explicit historical banners. No record or original source citation was deleted. Sources and current asset metadata were corrected, not replaced with generic links.

<a id="baseline-closure-report--task-0d--exhaustive-local-links-and-documentation-baseline"></a>

#### Task 0D — exhaustive local links and documentation baseline

The reproducible [Markdown audit](qa/close-baseline-audit.py) checks root AGENTS/README/STATUS, **every Markdown document under docs/**, supplied handoff README and legacy README; generated copies and dependency caches are excluded. It checks local Markdown/image/reference targets and Markdown heading anchors, UTF-8 decoding, replacement characters and common mojibake patterns. Fenced examples are excluded from actual navigation checks. External URLs are inventoried separately; the requirement here is local link integrity, not a claim that every external URL or official policy was re-certified.

Three real broken links were repaired: asset register `../../assets/` now points to `../../public/assets/`; two historical architecture links now target actual current/future headings. Full final counts and every checked target are in [markdown-links.json](qa/baseline-closure/markdown-links.json). Fresh final scan reports zero missing paths, zero missing anchors and zero detected encoding issues. A complete classified document index appears in [docs/README.md](README.md); root README remains the current overview with separate gated-work and deployment/source limits. Architecture Part A is current and Part B is planned/gated.

Stale-claim scan terms: `eight tests`, `8 tests`, `no NASA asset`, `NASA resource absent`, `placeholder`, `four files`, `pathfinding.js together`, `H1`, `af9ac9e`, `not deployed`. Remaining old claims occur in annotated historical records or literal task specifications; the Globe placeholder and unverified public deployment remain accurate current limitations. The source register's former no-georeferenced-sector claim and asset register's former 16-level-10 inventory were corrected. The repeated older reconciliation blocks no longer call M1/M2/L2 unresolved.

Task 0D's documentary edits are separate from the small Task 1 acceptance repair below. The earlier static-only source layouts and counts are not relabeled as current React code. Exact baseline/import/export/HTML-entry inventory is preserved in JSON and the appendix.

<a id="baseline-closure-report--task-1--registered-leaflet-acceptance-revalidated"></a>

#### Task 1 — registered Leaflet acceptance revalidated

Existing source is retained; this was not a map rewrite. Eight pure domain engines remain unchanged. Inspection found that React MapPanel had kept latitude/longitude but omitted the original pointer **grid-cell readout** and explicit **sector bounds**. Those two presentation omissions were restored using `latLngToGrid()`/`SECTOR`, with no new projection, coordinate source, dependency or routing change. This is a Task 1 parity repair, not a documentation-only change hidden under Task 0D.

Focused real-browser checks: [close-map-checks.mjs](qa/close-map-checks.mjs), [raw results](qa/baseline-closure/registered-map-checks.json), Edge 157.0.4341.57 on Windows, headless. Both 1440 and 360 px initial views fit the entire sector. Markers and canvas route vertices were checked after pan at zooms 11, 12 and 13 with the original strict **≤1 px** requirement: worst marker error 0.000000 px; worst canvas route-vertex error 0.000000 px. All native marker buttons are 44 × 44 CSS px and keyboard focusable.

| Viewport | Initial fitted zoom | N–S extent (m) | E–W extent (m) | Cell width at native level 12 (px) |
| --- | --- | --- | --- | --- |
| 1440 | 12 | 4000.000000 | 3999.999974 | 10.0 |
| 360 | 11 | 4000.000000 | 3999.999974 | 10.0 |

Spike repeated in the actual React Leaflet instance: Leaflet 1.9.4; zoom-0 world 512 × 256 px, NW (0,0), SE (512,256); level-10 tile corner (374528,103168) and level-12 corner (1499648,416768) exact; one-degree Mars latitude distance within 1 m of 59,274.6975 m. Sector N–S and E–W lengths are each within 1 m of 4000, and native cell width exceeds 8 px.

Additional focused checks: pointer reports `grid cell 20, 20`; UI shows DERIVED bounds; hiding hazard shading leaves the hazardous route/cost unchanged; identical endpoints use correct dust narrative; tile-error handler shows a message without breaking actual routing. Existing full browser harnesses cover actual missing-tile requests, map/route controls, keyboard zoom/pan, no-route handling, fullscreen/view retention, and tablet/timeline/recon regressions. Source scans find no application map CSS-transform pan/zoom, `getBoundingClientRect` positioning, custom screen projection or manual marker pixel positioning outside Leaflet. Test scripts intentionally use Leaflet projection and DOM rectangles to measure alignment, not to position the map.

<a id="baseline-closure-report--verification-commands-and-outcomes"></a>

#### Verification commands and outcomes

| Command | Result |
| --- | --- |
| `python docs/qa/close-baseline-audit.py numeric pdf probes` | Parsed 13 matrix levels; hashes/geometry verified; all three exact local PDF pages rendered; three source probes returned 200 |
| `python docs/qa/close-baseline-audit.py links` | All scoped local Markdown paths/anchors resolve; zero encoding issues; raw inventory retained |
| `node docs/qa/close-map-checks.mjs` | Desktop + 360 px projection/measurement/hygiene/readout/layer/tile-failure checks pass |
| `npm.cmd test` | 39 passed, 0 failed |
| `npm.cmd run test:browser` | 40 React development groups across desktop, tablet-width, mobile, reduced motion |
| `npm.cmd run test:legacy` | Original 81 checks × 3 configurations = 243 passed |
| `npm.cmd run build` | Static two-entry production build exits 0; source disclosures refreshed |
| `npm.cmd run test:production` | 36 groups across the same four configurations under nested `/ares-hud/` path |
| JS/MJS syntax + source/encoding scan | Current sources/tools pass; JSX compiled by Vite; pure engines and vendor/source assets retained |
| `git diff --check` | No new whitespace errors; intentional historical Markdown hard breaks remain |

Vite's existing external-vendored-script/CSS notices remain expected; production tests confirm those public Leaflet files load correctly. No public deployment, physical touch-device, screen-reader or cross-browser certification is claimed. PDF rendering used PyMuPDF 1.24.14 installed only in ignored `.browser-qa/pdf-tools/`; it is read-only local QA tooling, not a project/runtime dependency. Generated source comparison figures live only under docs/qa, not public/assets.

<a id="baseline-closure-report--documentation-inventory-and-reconciliation"></a>

#### Documentation inventory and reconciliation

The inventory captured by this closure pass is preserved in the [pre-cleanup snapshot bundle](qa/history/markdown-before-cleanup.zip). For the current retained documentation, use [docs/README.md](README.md). Cleanup removes superseded standalone reports only; this report's executed technical findings and raw QA artifacts remain retained.

<a id="baseline-closure-report--module--html-inventory-all-non-generated-application-trees"></a>

#### Module / HTML inventory (all non-generated application trees)

| File | Responsibility / entry scripts | Exports |
| --- | --- | --- |
| `src/App.jsx` | Supplied React App UI component; production adapters where under src/. | DISCLAIMER, default |
| `src/main.jsx` | React entry. | — |
| `src/tablet-main.jsx` | Standalone React tablet entry. | — |
| `src/components/MapPanel.jsx` | Supplied React MapPanel UI component; production adapters where under src/. | default |
| `src/components/MissionPanel.jsx` | Supplied React MissionPanel UI component; production adapters where under src/. | default |
| `src/components/Modal.jsx` | Supplied React Modal UI component; production adapters where under src/. | default |
| `src/components/SourcesView.jsx` | Supplied React SourcesView UI component; production adapters where under src/. | default |
| `src/components/TabletView.jsx` | Supplied React TabletView UI component; production adapters where under src/. | default |
| `src/components/TelemetryPanel.jsx` | Supplied React TelemetryPanel UI component; production adapters where under src/. | default |
| `src/components/Timeline.jsx` | Supplied React Timeline UI component; production adapters where under src/. | default |
| `src/domain/datasets.js` | NASA/USGS source metadata. | datasets |
| `src/domain/fog.js` | Simulated knowledge reveal and uncertainty penalty. | revealTrail, applyRecon |
| `src/domain/geo.js` | Pure sector/grid/Mars-distance arithmetic. | cellLat, cellLng, gridToLatLng, gridCornerToLatLng, latLngToGrid, metersBetween, bearing, tileIndex, sectorSpanMeters, tileRange |
| `src/domain/map-crs.js` | Mars sphere CRS definition. | MARS_RADIUS, METRES_PER_DEGREE, createMarsEq, MARS_EQ, marsDistance |
| `src/domain/mission.js` | Multi-leg route accumulation, ordering and layer state. | planMission, moveStop, layerState |
| `src/domain/pathfinding.js` | Deterministic pure A* and simulated grid. | SIZE, HAB, SCIENCE, createGrid, findPath |
| `src/domain/plan.js` | Input-only schema, checksum and plan serialization. | checksum, validatePlan, makePlan, serializePlan, parsePlan |
| `src/domain/sector.js` | Hypothetical sector bounds, Hab and stops. | SECTOR, TILE_BOUNDS, MAX_NATIVE_ZOOM, MIN_ZOOM, MAX_ZOOM |
| `src/domain/sols.js` | Eight excursions and cost-based path interpolation. | createSols, buildSol, positionAt |
| `src/integrations/map.js` | Leaflet viewport factory. | PANE_Z, createSectorMap |
| `src/integrations/sector-layers.js` | Leaflet grid/hazard/route/marker builders. | drawGrid, drawHazards, drawRoute, drawMarkers |
| `src/integrations/tablet-bridge.js` | Validated input-only tablet receiver / independent planner. | receiveTabletPlan |
| `src/integrations/use-mission.js` | React subscription and playback interval cleanup. | useMission |
| `src/state/mission-store.js` | Authoritative mission inputs and derived results. | days, trailMetres, createMissionStore |
| `scripts/browser-qa.mjs` | Build/acquisition/browser verification tooling; browser-qa. | — |
| `scripts/fetch-tiles.mjs` | Build/acquisition/browser verification tooling; fetch-tiles. | — |
| `scripts/legacy-qa.mjs` | Build/acquisition/browser verification tooling; legacy-qa. | — |
| `scripts/prepare-public.mjs` | Build/acquisition/browser verification tooling; prepare-public. | — |
| `scripts/static-server.mjs` | Build/acquisition/browser verification tooling; static-server. | staticServer |
| `scripts/vendor-leaflet.mjs` | Build/acquisition/browser verification tooling; vendor-leaflet. | — |
| `tests/fog.test.js` | Automated tests for fog | — |
| `tests/geo.test.js` | Automated tests for geo | — |
| `tests/mission-store.test.js` | Automated tests for mission-store | — |
| `tests/mission.test.js` | Automated tests for mission | — |
| `tests/pathfinding.test.js` | Automated tests for pathfinding | — |
| `tests/plan.test.js` | Automated tests for plan | — |
| `tests/sols.test.js` | Automated tests for sols | — |
| `legacy/app.js` | Original DOM-based mission orchestration. | — |
| `legacy/browser-test.html` | HTML entry; scripts: vendor/leaflet/leaflet.js | — |
| `legacy/datasets.js` | NASA/USGS source metadata. | datasets |
| `legacy/exploration.js` | Original source/geology/surface-image DOM adapter. | — |
| `legacy/fog.js` | Simulated knowledge reveal and uncertainty penalty. | revealTrail, applyRecon |
| `legacy/fog.test.js` | Automated tests for fog | — |
| `legacy/geo.js` | Pure sector/grid/Mars-distance arithmetic. | cellLat, cellLng, gridToLatLng, gridCornerToLatLng, latLngToGrid, metersBetween, bearing, tileIndex, sectorSpanMeters, tileRange |
| `legacy/geo.test.js` | Automated tests for geo | — |
| `legacy/index.html` | HTML entry; scripts: vendor/leaflet/leaflet.js, app.js, exploration.js | — |
| `legacy/map-crs.js` | Mars sphere CRS definition. | MARS_RADIUS, METRES_PER_DEGREE, createMarsEq, MARS_EQ, marsDistance |
| `legacy/map.js` | Leaflet viewport factory. | PANE_Z, createSectorMap |
| `legacy/mission-controls.js` | Original timeline/recon/handoff DOM adapter. | mountMissionControls |
| `legacy/mission.js` | Multi-leg route accumulation, ordering and layer state. | planMission, moveStop, layerState |
| `legacy/mission.test.js` | Automated tests for mission | — |
| `legacy/pathfinding.js` | Deterministic pure A* and simulated grid. | SIZE, HAB, SCIENCE, createGrid, findPath |
| `legacy/pathfinding.test.js` | Automated tests for pathfinding | — |
| `legacy/plan.js` | Input-only schema, checksum and plan serialization. | checksum, validatePlan, makePlan, serializePlan, parsePlan |
| `legacy/plan.test.js` | Automated tests for plan | — |
| `legacy/sector-layers.js` | Leaflet grid/hazard/route/marker builders. | drawGrid, drawHazards, drawRoute, drawMarkers |
| `legacy/sector.js` | Hypothetical sector bounds, Hab and stops. | SECTOR, TILE_BOUNDS, MAX_NATIVE_ZOOM, MIN_ZOOM, MAX_ZOOM |
| `legacy/sols.js` | Eight excursions and cost-based path interpolation. | createSols, buildSol, positionAt |
| `legacy/sols.test.js` | Automated tests for sols | — |
| `legacy/tablet.html` | HTML entry; scripts: vendor/leaflet/leaflet.js, tablet.js | — |
| `legacy/tablet.js` | Original independent tablet DOM adapter. | — |
| `legacy/initial-files/app.js` | Original DOM-based mission orchestration. | — |
| `legacy/initial-files/index.html` | HTML entry; scripts: app.js | — |
| `legacy/initial-files/pathfinding.js` | Deterministic pure A* and simulated grid. | SIZE, HAB, SCIENCE, createGrid, findPath |
| `legacy/initial-files/pathfinding.test.js` | Automated tests for pathfinding | — |
| `legacy/UI/index.html` | HTML entry; scripts: /src/main.jsx | — |
| `legacy/vendor/leaflet/leaflet.js` | Build/acquisition/browser verification tooling; leaflet. | — |
| `legacy/UI/src/App.jsx` | Supplied React App UI component; production adapters where under src/. | default |
| `legacy/UI/src/main.jsx` | React entry. | — |
| `react-ui-handoff/index.html` | HTML entry; scripts: /src/main.jsx | — |
| `react-ui-handoff/src/App.jsx` | Supplied React App UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/main.jsx` | React entry. | — |
| `react-ui-handoff/src/components/MapPanel.jsx` | Supplied React MapPanel UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/components/MissionPanel.jsx` | Supplied React MissionPanel UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/components/Modal.jsx` | Supplied React Modal UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/components/SourcesView.jsx` | Supplied React SourcesView UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/components/TabletView.jsx` | Supplied React TabletView UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/components/TelemetryPanel.jsx` | Supplied React TelemetryPanel UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/components/Timeline.jsx` | Supplied React Timeline UI component; production adapters where under src/. | default |
| `react-ui-handoff/src/data/demo.js` | Handoff-only illustrative seed data; absent from production src/. | INITIAL_STOPS, SOURCES, SOLS |

Imports and complete machine-readable entries are in repository-facts.json. Source trees in legacy/UI and react-ui-handoff are historical/input scaffolds, not competing production state or maps.

<a id="baseline-closure-report--files-changed-and-remaining-owner-checks"></a>

#### Files changed and remaining owner checks

Changed: current root README/STATUS; docs navigation, source/asset registers, historical banners/finding annotations, actual Git changelog and two broken historical architecture anchors; this report and supporting QA tools/results/figures. Task 1 alone changes MapPanel's missing cell/bounds text. Application routing, pure math, PDF/JPEG/PNG files, vendor licenses, owner approval rules and release schedule were not changed. Existing unrelated working changes remain intact.

Not verified: public-host deployment/private-window approval, physical phone/touch/assistive technology, event portal eligibility/rules/offers, submission or freeze tag. No commit was created merely to replace a missing report ID; the existing verified code commit and exact working-tree evidence are sufficient to record local task acceptance separately from those release gates. No video, push or submission was made.

<a id="react-migration-report"></a>

## REACT_MIGRATION_REPORT.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

<a id="react-migration-report--react-ui-integration-report--14-november-2026"></a>

### React UI integration report — 14 November 2026

This report records implementation and executed checks. [STATUS.md](../STATUS.md) alone records migration acceptance. No public deployment, commit or submission was performed. The pre-existing staged `react-ui-handoff/` content was preserved without modification.

<a id="react-migration-report--final-directory-tree"></a>

#### Final directory tree

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

<a id="react-migration-report--moved-reused-and-modified-files"></a>

#### Moved, reused and modified files

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

<a id="react-migration-report--feature-integration"></a>

#### Feature integration

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

<a id="react-migration-report--commands-and-actual-results"></a>

#### Commands and actual results

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

<a id="react-migration-report--recovery-stages"></a>

#### Recovery stages

1. Read operating rules, all named modules, prior UI/historical/vendor/acquisition directories and supplied handoff. Record Git state and baseline 33 passing tests.
2. Snapshot all original implementation/test/asset files; keep the supplied handoff's staged changes intact. Copy pure engines and supplied visuals into the target structure.
3. Wire a single authoritative mission store and isolated validated tablet adapter. Verify 39 tests and React browser workflow before consolidating original paths.
4. Retain complete original static app with assets/vendor in `legacy/`; verify its original 33 tests and 81-check browser harness in all three configurations.
5. Build and test static output under a nested path, preserve licenses/source notes, record durable evidence and synchronize current documentation.

The last recoverable original implementation remains present. From repository root: `python serve.py --directory legacy --port 8013`. Production: `npm run build`, then `python serve.py`. For deployment upload only `dist/` contents. No historical app, source imagery, source license or original QA evidence was discarded.

<a id="react-migration-report--remaining-limits-and-owner-decisions"></a>

#### Remaining limits and owner decisions

- No public deployment, reachable phone URL, physical touch-device, Safari/Firefox, assistive-technology or submission certification. Desktop Edge viewport emulation is the evidence available.
- Globe stays a placeholder as requested; numerical elevation/slope and terrain-aware routing remain separately gated. No generated NASA-like terrain, invented route metrics or demo-state data is used by production.
- QR and BroadcastChannel/server synchronization remain deferred; URLs reproduce validated snapshots. A phone must reach the host; localhost refers to the phone itself.
- Timeline is a simulated cost-based reference replay, not physical elapsed time; recon replans a candidate remainder and handoff uses the last reached cell. No weather, suit, radiation or operational safety model exists.
- Historical reports retain their original revision-specific claims. Their old root paths map through the table above; this report and current architecture are navigation, and STATUS.md remains authoritative.
- No commits were made to avoid mixing the owner's pre-existing staged handoff with migration changes. All implementation changes are reviewable in the working tree; legacy copies remain intentionally until owner cleanup.

<a id="react-migration-report--data-assets-and-documentation"></a>

#### Data, assets and documentation

Data classes remain visible: OBSERVED imagery, DERIVED coordinate/distance arithmetic, INTERPRETED geology and SIMULATED sector/stops/routes/costs/hazards/Sols/reconnaissance. No new scientific asset was acquired. Original source URLs, credits, retrieval evidence, bytes and hashes are preserved in DATA_SOURCES.md and the manifest. Full runtime license texts are copied into static output; see THIRD_PARTY.md. Codex assisted integration and verification; earlier work reports OpenCode/DeepSeek.

Updated documentation: root README/STATUS/AGENTS, docs navigation/current architecture, preserved prior architecture, owner addendum's explicit React build exception, plan/task context banners, source register path mapping, asset register, third-party disclosures, legacy recovery instructions and this report. Release schedule and other owner gates remain applicable. No demo video was created.

<a id="react-migration-report--handoff-folder-removal"></a>

#### Handoff folder removal

The owner may delete the repository-root `react-ui-handoff/` scaffold without removing current application inputs, based on the source/configuration inspection below. **This documentation pass has not deleted the folder or tested running the app after removal.** Current production source is root `src/` and `public/`, not the original scaffold.

<a id="react-migration-report--preserved-integration-notes-and-design-reference"></a>

##### Preserved integration notes and design reference

The previously untracked handoff README is preserved **byte-for-byte** as [react-ui-handoff-readme.txt](qa/history/react-ui-handoff-readme.txt). It contains the original integration contracts, proposed layout, UI-only limitations and Figma reference:

https://www.figma.com/design/KRhDzngAouWSkuSxHsBguY/ARES-HUB?node-id=2-2

This is a retained design citation, not a newly verified Figma resource or proof of any current application functionality. The saved README describes the original scaffold, not current run commands or component contracts. Use the root README and ARCHITECTURE.md for current instructions.

Preserved original: **3634 bytes**, SHA-256 **`386e327e6c3dcdaf2288e5b8ae6618aa473eeb579755fb2ea8a2e36cdd309a5a`**. The copy was compared with the original bytes before documenting removal. Do not rely on Git to restore the formerly untracked README; retain this saved copy.

<a id="react-migration-report--dependency-checks-and-deletion-effects"></a>

##### Dependency checks and deletion effects

- `vite.config.js` builds repository-root `index.html` and `tablet.html`, with root source imports. `package.json` dev/build/test scripts do not select the scaffold's package.json.
- `scripts/prepare-public.mjs` copies current docs/licenses into root `public/`; no handoff source/asset is copied. Current source/assets are retained in `src/` and `public/`.
- Executed `rg -n react-ui-handoff src scripts tests index.html tablet.html vite.config.js package.json`: **exit 1, no matches** (the expected no-reference result). This is a static dependency check, not a fresh production build or runtime deletion test.
- `git status --short -- react-ui-handoff` showed `?? react-ui-handoff/README.md`. The README therefore needed the independent copy above. Existing tracked scaffold files remain recoverable from their Git revision; the runtime does not require them.
- Historical migration/evidence scripts and inventories under `docs/qa/` mention the scaffold. Deleting it prevents exact repetition of the original source-inventory/migration procedure without restoring the input folder. In particular, `docs/qa/close-baseline-audit.py` includes `react-ui-handoff/README.md` in its historical audit scope; running that original audit unmodified after deletion would report a missing input. This does not affect npm dev/build/test runtime commands.
- Narrative references in policy, closure and migration reports record where the UI originated. They remain provenance statements, not required runtime paths. No active Markdown link depends on a file inside the deletable folder; current notes link to the saved text instead.
- `legacy/` separately preserves the earlier application and recovery path. It is not the same as the supplied UI scaffold, and removing the scaffold does not authorize removing `legacy/`.

Deletion scope is **only the repository-root `react-ui-handoff/`**. Keep root `src/`, `public/`, `scripts/`, package files, `legacy/`, current documentation, licenses and QA evidence. No source, configuration, dependency or test code was changed for this note. Task acceptance and deployment status remain unchanged in STATUS.md.

<a id="gated-feature-spikes"></a>

## GATED_FEATURE_SPIKES.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

<a id="gated-feature-spikes--gated-feature-investigations---14-november-2026"></a>

### Gated feature investigations - 14 November 2026

These are verification artifacts, not integrated product features. No globe dependency or asset was added to the production app. Full Task 7 acceptance has NOT passed. No commit or deployment.

<a id="gated-feature-spikes--task-7-globe-investigation"></a>

#### Task 7: globe investigation

NASA's [WMTS documentation](https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars) links its configuration and getLayerServices endpoint. Local catalog product UUID a4f540e4-79a5-4a20-8265-1216a5da37f7 was resolved using [NASA's layer service](https://trek.nasa.gov/mars/TrekServices/ws/index/getLayerServices?uuid=a4f540e4-79a5-4a20-8265-1216a5da37f7), HTTP 200. This is a separate global product, not the regional Jezero CTX mosaic.

Verified [GetCapabilities](https://trek.nasa.gov/tiles/Mars/EQ/msss_atlas_simp_clon/1.0.0/WMTSCapabilities.xml):

- Layer `msss_atlas_simp_clon`, MGS MOC Atlas, Global Color Mosaic; Mars Global Surveyor / Mars Orbiter Camera. Catalog describes primarily May-June 1999 wide-angle red observations. Candidate attribution NASA/JPL/MSSS; exact redistribution wording and the mosaic's color processing still need final source review.
- EPSG:104905 identifier in the XML; equirectangular/geographic matrix with upper-left -180,90, east-increasing columns and south-increasing rows. Geographic bounds -179.9999885,-89.9999958 to 179.9999862,89.9999916. The WGS84BoundingBox is the service's OGC wrapper, not proof of an Earth datum for Mars. Planetocentric/planetographic latitude convention needs explicit authoritative confirmation before mission markers.
- Style `default`, matrix set `default028mm`, levels 0-6. Level L has 2^(L+1) columns and 2^L rows, 256px tiles. Format image/png. The advertised ResourceURL contains a double slash before style; used exactly as advertised, HTTP 200 for both level-0 tiles.
- Level 0 assembles a 512x256 global texture, 0.703125 degrees per pixel. This is coarse context only; no surface scale or elevation can be inferred from it. Source coverage near the poles/seam and physical landmark alignment are not certified by a successful decode.

<a id="gated-feature-spikes--disposable-rendering-test"></a>

##### Disposable rendering test

`.browser-qa/globe-spike/` contains a static, offline Three.js r160 test and two locally downloaded NASA PNGs. This directory is ignored and must not be deployed. [SphereGeometry](https://threejs.org/docs/pages/SphereGeometry.html) accepts an explicit radius; the spike uses 3,396,190 m and uniform scale for numeric camera convenience. The [r160 module](https://raw.githubusercontent.com/mrdoob/three.js/r160/build/three.module.js) is 1,272,972 bytes and works directly as an ES module without a build. [MIT licence](https://raw.githubusercontent.com/mrdoob/three.js/r160/LICENSE), 1,081 bytes. r160 is a tested candidate pin, not approval or a claim that it is the latest release.

Candidate comparison: Three.js provides the required sphere and offline ES module with modest dependency scope; raw WebGL would require maintaining mesh/shader/context/input plumbing and lacks this tested renderer abstraction. Other large globe engines were not vetted in this time box. No renderer has been approved for production.

Actual browser: Windows, Intel Core i3-7130U @2.70GHz, Intel HD Graphics 620 via ANGLE/D3D11; Edge 157.0.0.0, WebGL2, MAX_TEXTURE_SIZE 16384. Headless viewport 1256x908 (requested outer window 1280x1000). The performance.now instrumentation reported 222.8ms to first textured render under headless virtual-time testing. This is not a wall-clock performance benchmark or acceptance result. Local canvas pixel read succeeded. Two source PNGs total 88,039 bytes; renderer + licence + textures total 1,362,092 bytes, excluding HTML/XML/QA metadata. Decoded RGBA texture plus mipmaps is approximately 699,051 bytes, excluding framebuffer/geometry/driver overhead. Peak memory and interactive frame rate NOT MEASURED.

Button rotation and zoom passed. Separate headless cases exercised absent WebGL, missing local texture and forced context loss: each displayed an explicit failure and a keyboard-accessible Surface Mode link. Narrow runs requested 360px outer windows, but a strict 360px globe content viewport, drag/touch, focus transfer, repeated enter/leave cleanup, keyboard behavior and reduced-motion behavior are NOT certified. The spike has no automatic animation loop.

Mapping proposed: source u=(longitude+180)/360 and v=(latitude+90)/180; Three sphere x=cos(lat)*cos(lon), y=sin(lat), z=-cos(lat)*sin(lon), with north at positive Y. This matches the mesh's mathematical UV orientation; reference-point/seam visual registration is NOT VERIFIED. Development download and local pixel read do not establish NASA browser CORS. No external browser CORS is required by the proposed local-runtime architecture.

<a id="gated-feature-spikes--mission-marker-evidence-not-deployed-markers"></a>

##### Mission marker evidence, not deployed markers

[NASA Perseverance EDL assessment](https://ntrs.nasa.gov/citations/20210024644) reports landing on 18 February 2021 at 18.44463 N, 77.45088 E. [NASA Curiosity EDL assessment](https://ntrs.nasa.gov/api/citations/20130010129/downloads/20130010129.pdf?attachment=true) reports 4.5895 S, 137.4417 E. These are historical landing sites, not current positions. The precise latitude/datum conventions and their compatibility with the global texture were not established, so no markers or tracks were integrated. Curiosity remains Gale context only.

<a id="gated-feature-spikes--gate-and-next-action"></a>

##### Gate and next action

Full implementation is blocked by incomplete coordinate/landmark and lifecycle/performance verification, plus separate owner approval. Retain 2D. Recommended next technical step: verify latitude convention and landmarks, complete desktop/360px/keyboard/context restoration and repeated lifecycle measurements, then present a specific renderer/texture-size budget for approval. Estimated remaining spike 30-45 minutes; integrated globe, state-preserving transitions and acceptance approximately 2-3 hours after a successful spike and approval, subject to the 13:30 GMT 15 November feature cutoff. These are estimates, not promises.

The current addendum section 1 explicitly says "separate owner go/no-go required for full implementation"; Task 7 says "STOP for separate owner go/no-go". No full globe implementation proceeded.

<a id="gated-feature-spikes--task-5-numeric-elevation-investigation"></a>

#### Task 5: numeric elevation investigation

The [USGS Mars 2020 Jezero landing-site products page](https://astrogeology.usgs.gov/search/map/mars-2020-jezero-crater-landing-site-products) is a candidate official source for CTX/HiRISE digital terrain models. Search metadata identifies a 20 m/pixel CTX DEM and TRN products. Opening the product page returned HTTP 403; stopped this acquisition step. No GeoTIFF, numeric elevations, nodata values, vertical units or registration were verified. The cached Trek catalog query explicitly excludes DEM, ConfidenceRaw and Slope categories; it cannot prove that Trek has no numeric elevation.

No terrain-cost code or fake elevation was added. Do not substitute MOLA color hillshade or image brightness.

Manual acquisition if the page opens for the owner: open the USGS page above, select its **Mars 2020 Science Investigation CTX DEM Mosaic** related product, download the numerical DEM (not orthophoto/hillshade) plus its metadata/readme. Place the unmodified files in `assets/elevation/source/` and preserve the exact download URL. Before integration, inspect CRS, horizontal/vertical units and datum, nodata and pixel registration; compare coverage to sector.js; compute metric-unit slopes with a documented resampling/nodata method and test it. The Task 5 spike and separate owner approval still apply. Do not claim the search snippet itself validates the raster.

<a id="gated-feature-spikes--acquired-files-spike-only"></a>

#### Acquired files: spike only

Retrieval date: 14 November 2026. Every entry below returned HTTP 200; filenames are local QA paths, not production assets.

| Local file | Bytes | SHA-256 | Exact source |
| --- | --- | --- | --- |
| .browser-qa\globe-spike\tile-0.png | 44128 | 014f5a30f4c40f8add4b23d71f2fa6833263138aa49c16f63d1e25f594e07915 | [source](https://trek.nasa.gov/tiles/Mars/EQ/msss_atlas_simp_clon/1.0.0//default/default028mm/0/0/0.png) |
| .browser-qa\globe-spike\tile-1.png | 43911 | 30720afa92b7210f16f28789985b085c6d785dcd4e079fef8ee7511000ef72f2 | [source](https://trek.nasa.gov/tiles/Mars/EQ/msss_atlas_simp_clon/1.0.0//default/default028mm/0/0/1.png) |
| .browser-qa\globe-spike\three.module.js | 1272972 | 76dea8151bc9352aef3528b4262e249b2604f62543828328db978d060d61a495 | [source](https://raw.githubusercontent.com/mrdoob/three.js/r160/build/three.module.js) |
| .browser-qa\globe-spike\LICENSE | 1081 | 852e0e8699169bf9f6fdc6bda3e682d078dcbc738b5d33e74df594721bff271d | [source](https://raw.githubusercontent.com/mrdoob/three.js/r160/LICENSE) |

<a id="globe-implementation-report"></a>

## GLOBE_IMPLEMENTATION_REPORT.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

> ORIGINAL SCIENTIFIC TASK 7 PREREQUISITE REPORT: the NO-GO below applies to geographically verified NASA-textured globe/markers. It does not describe the later owner-authorized procedural illustrative Globe, now merged. See [STATUS.md](../STATUS.md); original execution details remain preserved.

<a id="globe-implementation-report--globe-implementation-report"></a>

### Globe implementation report

<a id="globe-implementation-report--recommendation-no-go-for-merging-task-7"></a>

#### Recommendation: NO-GO for merging Task 7

Current branch verified as `3D-globe`. Owner's latest request authorizes implementation, but requires scientific verification first. No additional implementation permission is being requested. Implementation stopped at that scientific/provenance prerequisite; no globe component or landing markers were added. Main, deployment and existing working changes were untouched.

<a id="globe-implementation-report--newly-verified-blocker"></a>

#### Newly verified blocker

The exact NASA metadata endpoint returned HTTP 200:
https://trek.nasa.gov/mars/TrekWS/rest/cat/metadata/fgdc/html?label=msss_atlas_simp_clon

It contains `Access_Constraints: PRIVATE`, `Use_Constraints: TBD`, placeholder originator/title/date fields and no latitude convention. These may be incomplete catalog defaults, but they do not establish permission or geographic compatibility. Public tile accessibility does not resolve this inconsistency. Snapshot: docs/qa/globe-preflight/trek-moc-metadata.html; 3647 bytes; SHA-256 23627ce2575fba2ef999c8ac53bcb92383547f1d94d0c7d3311f32e5f1ca61bb.

The WMTS listing establishes the product ID and geographic tile layout, not whether source latitudes are planetocentric or planetographic. The preliminary sphere's UV arithmetic does not demonstrate landmark registration. Longitude seam, source landmark alignment and rover coordinate compatibility remain UNVERIFIED. No fabricated registration or rover positions were introduced.

Sources investigated: NASA Trek API https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars ; NASA metadata endpoint above; original MSSS atlas https://msss.com/mars_images/moc/moc_atlas/ . The original atlas page failed via web fetch (502) and direct retrieval (TLS hostname mismatch); certificate verification was retained. General MGS coordinate documentation cannot establish the convention of this specific processed mosaic.

<a id="globe-implementation-report--repository-inspection"></a>

#### Repository inspection

Read the prior gated spike, baseline closure and React migration reports; inspected App.jsx, MapPanel.jsx, geographic helpers and existing test inventory. Mission store remains above the view switch, and the existing Leaflet map is retained while the globe placeholder is shown. These are useful integration points once the data prerequisite is resolved.

<a id="globe-implementation-report--implementation-and-verification-status"></a>

#### Implementation and verification status

No production files, dependency or NASA asset changed. Modified documentation: this report, STATUS.md and docs/README.md. Added metadata evidence snapshot above. Existing uncommitted README/STATUS and untracked documentation preserved.

No new globe browser or performance measurements were executed; prior spike timings remain preliminary and are not acceptance evidence. React globe rotation/zoom, mission markers, lifecycle disposal, WebGL failure handling, keyboard/mobile controls and transitions have NOT been implemented or verified in this pass. Baseline test/build results are recorded in STATUS.md after execution; they do not validate a globe.

<a id="globe-implementation-report--next-technical-step"></a>

#### Next technical step

Obtain authoritative metadata/usage clarification for this exact Trek mosaic, or identify a different NASA global product with explicit latitude convention, longitude convention and reuse terms. Then verify identifiable landmarks and seam orientation against source-linked reference coordinates before implementing markers. Preserve the existing 2D fallback. No merge or deployment is recommended until implementation and all Task 7 acceptance checks pass.

<a id="globe-implementation-report--continuation---15-november-2026"></a>

#### Continuation - 15 November 2026

Original MSSS documentation is accessible via www.msss.com (the earlier bare-host failure is not a continuing access blocker). https://www.msss.com/mgcwg/mgm/about_processing.html explicitly specifies areographic latitude and west-positive longitude. https://www.msss.com/mgcwg/mgm/ specifies MDIM 2.0 reference axes Re=3396.0 km, Rp=3376.8 km and W0=176.7215 degrees. This establishes the original mosaic convention, but does NOT establish what reprojection/datum transformation Trek applied to msss_atlas_simp_clon. Direct placement of modern rover landing coordinates therefore remains unjustified. No landmark alignment is claimed.

The interrupted run had 39 passing Node tests, but build FAILED because docs/DATA_SOURCES.md was absent. Its subsequent 36 passing production-browser groups used the pre-existing dist directory and cannot validate a fresh build. Corrected that distinction here.

Restored missing docs/DATA_SOURCES.md, docs/THIRD_PARTY.md and docs/assets/README.md from byte-identical copies in public/docs and dist/docs. No source content was invented. These source disclosures must be included with the branch. Fresh build/test results follow in STATUS.md. Globe remains unimplemented and merge recommendation remains NO-GO pending verified Trek transformation and provenance.

Build repair result: npm run build passed. Browser recheck: 36 grouped checks, zero failures; launch overlapped the finishing build, so not an isolated clean-build certification. No globe checks passed or claimed.

<a id="simplified-globe-report"></a>

## SIMPLIFIED_GLOBE_REPORT.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

> HISTORICAL EXECUTION REPORT / CURRENT FEATURE EVIDENCE: the original branch run below preceded merge. The reduced illustrative scope is now merged in 3d20ff4 (15 November 2026); no fresh browser run is inferred. Current acceptance/deployment limits are in [STATUS.md](../STATUS.md).

<a id="simplified-globe-report--simplified-globe-report"></a>

### Simplified globe report

Owner-approved illustrative scope, implemented on 3D-globe. No merge, main change or deployment. Original geographic Task 7 remains NO-GO; this is a different feature with no registration requirement.

<a id="simplified-globe-report--implementation"></a>

#### Implementation

Reusable lazily imported React PlanetaryGlobe component with pointer/touch dragging, arrow-key rotation, plus/minus zoom, Home/reset and visible native controls. Explore Jezero returns to the retained Leaflet map without replacing the mission store. Original map projection and mission engines are unchanged. Globe heading explicitly says Illustrative Planetary Overview and SIMULATED artwork; no coordinates, rover markers, scientific overlays or location highlight are displayed.

Texture is original deterministic 512x256 procedural Canvas artwork generated in code, covered by the repository MIT licence; it represents no observations. No disputed Trek imagery was copied. Three.js r160 is reused from the local spike, vendored under vendor/three with MIT licence and byte/SHA-256/source manifest. Its licence is included in the built site. No external runtime services.

Rendering is on demand, coalesced with requestAnimationFrame. There is no auto-spin, inertia or continuous animation, including under reduced motion. Hidden document draws are skipped; switching to Surface unmounts the globe. Cleanup aborts listeners, disconnects ResizeObserver, cancels the pending frame, disposes geometry/material/texture/renderer, releases the WebGL context and removes the canvas. A React error boundary handles import/render failures; WebGL creation/context loss supplies an accessible Explore Jezero fallback.

<a id="simplified-globe-report--files"></a>

#### Files

src/components/PlanetaryGlobe.jsx (new), src/components/MapPanel.jsx (lazy view integration; existing Leaflet retained), src/App.jsx (Explore callback/focus), src/styles/main.css, vendor/three/{three.module.js,LICENSE,manifest.json}, scripts/prepare-public.mjs (licence copy), scripts/browser-qa.mjs (replace obsolete placeholder assertion), scripts/globe-qa.mjs (new).
Documentation: this report, STATUS.md, docs/README.md, docs/THIRD_PARTY.md, docs/ARCHITECTURE.md, README.md.

<a id="simplified-globe-report--executed-verification"></a>

#### Executed verification

- npm.cmd test: 39 passed, zero failed.
- npm.cmd run build: passed, 1603 modules; existing nonfatal vendored Leaflet warnings persist.
- npm.cmd run test:production: 36 grouped checks passed across 1440/768/360px and reduced-motion 360px. Existing routing/tablet/Sol/reconnaissance preserved.
- node scripts/globe-qa.mjs: passed desktop and 360px touch-emulated/reduced-motion runs, three enter/leave cycles each, rotation, zoom, Home/arrow keys, CDP touch drag, mission telemetry preservation, no overflow, no page errors and forced WebGL unavailability fallback. Mounted at /ARES-HUD/ to verify nested paths. First fallback run failed because test omitted experimental-webgl; corrected injection blocks all WebGL context names and passes.
- npm.cmd run test:browser: 40 grouped checks passed, including StrictMode map cleanup/remount.

<a id="simplified-globe-report--performance-and-remaining-risks"></a>

#### Performance and remaining risks

Lazy production globe chunk 457.81 kB (116.56 kB gzip). Renderer source is 1,272,972 bytes; texture is generated locally, no image download. Decoded texture RGBA base is 524,288 bytes (approximately 699,051 including mipmaps). Device pixel ratio capped at 1.5; 64x40 sphere; no postprocessing. These are size/design measurements, not FPS or heap benchmarks.

Repeated canvas teardown and state preservation tested. Resource cleanup inspected in source; sustained GPU/heap leak profiling, context-loss recovery testing, real phone hardware, screen reader and Safari/Firefox remain unverified. Touch is browser emulation. No geographic precision, real surface features or rover positions are claimed. Public deployment has not been changed or tested for this branch.

<a id="simplified-globe-report--recommendation"></a>

#### Recommendation

GO for owner review and merge of the simplified illustrative feature, subject to the disclosed physical-device/GPU profiling limitations. No approval or claim of completion for the original registered globe proposal. Do not deploy without owner approval.

<a id="github-pages-diagnosis"></a>

## GITHUB_PAGES_DIAGNOSIS.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

> HISTORICAL DIAGNOSIS: raw-source failure below describes the original investigation. The public site subsequently serves a compiled bundle and returned HTTP 200 for entry/bundle/Leaflet/tablet on 15 November. See [current HTTP evidence](qa/public-deployment-check.json) and [STATUS.md](../STATUS.md). This supersedes failure/pending-publication wording as current status, without claiming full live-browser acceptance.

<a id="github-pages-diagnosis--github-pages-diagnosis---14-november-2026"></a>

### GitHub Pages diagnosis - 14 November 2026

<a id="github-pages-diagnosis--verified-cause"></a>

#### Verified cause

Remote main is `96f0dcfdfcdd20826afdcd8902f23c1f47224031` (merge of UI-update). Current checkout remains UI-update; no branch switch or overwrite. Source/build configuration compared equal to main. Main has no .github Pages build workflow.

The live URL https://anj-13.github.io/ARES-HUD/ returned HTTP 200 containing the unprocessed root index.html: literal `%BASE_URL%` references and `/src/main.jsx`. An actual headless Edge navigation confirmed zero children under #root, HTTP 400 for the placeholder Leaflet JS/CSS URLs and HTTP 404 for https://anj-13.github.io/src/main.jsx. This proves raw-source publication; it is not a React routing or NASA-service issue. The exact private Pages settings could not be read: GitHub CLI is unavailable and unauthenticated repository API access returned 404.

<a id="github-pages-diagnosis--prepared-local-fix"></a>

#### Prepared local fix

Added .github/workflows/pages.yml: push to main/manual dispatch, Node 24, npm ci, npm test, npm run build, upload only dist/, deploy-pages in github-pages environment with minimum deployment permissions. Vite base './' already supports a project subdirectory; no base change is needed. No application, NASA data or algorithm changes.

Three required disclosure source files are untracked and absent from main: docs/DATA_SOURCES.md, docs/assets/README.md and docs/THIRD_PARTY.md. Include these along with the workflow when preparing a commit/PR, otherwise CI's prepare-public step fails. The other pre-existing untracked documentation was left in place.

<a id="github-pages-diagnosis--owner-actions"></a>

#### Owner actions

1. Review and include the workflow plus the required disclosure files in the main branch (merge a PR if working on UI-update). Also include the updated deployment documentation as appropriate.
2. Settings -> Pages -> Build and deployment -> Source: GitHub Actions. Do not select main/root branch publishing for this Vite app.
3. Push/merge to main, then check Actions -> Build and deploy ARES-HUD to GitHub Pages. After the deployment job succeeds, hard-refresh the published URL and verify imagery, science traverse, dust, Return to Hab and standalone tablet.

No commit, push, settings mutation, workflow dispatch or deployment was performed in this diagnosis. No guarantee of repaired public behavior before owner publishes the fix.

<a id="github-pages-diagnosis--validation"></a>

#### Validation

npm.cmd test: 39 passed, zero failed. npm.cmd run build: passed; Vite emits compiled HTML, JS, CSS, local NASA tiles, vendored Leaflet and source disclosures in dist/. Existing Vite warnings about the classic vendored Leaflet script and runtime-resolved CSS are nonfatal; actual browser checks confirm those local files load.

npm.cmd run test:production: see final result in STATUS.md and .browser-qa/react-production-report.json. Tests serve dist/ under /ares-hud/, exercising relative subdirectory URLs, map imagery, mission engines and tablet at desktop/mobile/reduced motion. GitHub Actions execution, repository permissions and the repaired public URL remain unverified until publication.

Reference guidance: https://vite.dev/guide/static-deploy.html#github-pages and https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages . Both specify built-artifact publication through Actions.

<a id="judging-checklist"></a>

## JUDGING_CHECKLIST.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

> ACTIVE REFERENCE - official-rule links and team-provided guide summary retained; not independently revalidated in Task 0D. Use [STATUS.md](../STATUS.md) for implementation/deployment evidence; submission eligibility remains owner-verified.

<a id="judging-checklist--judgingchecklistmd--nasa-space-apps-2026-official-guide"></a>

### JUDGING_CHECKLIST.md — NASA Space Apps 2026 official guide

**Source:** Team-provided PDF `NASA Space Apps Challenge.pdf` — **Judging & Awards Guide**, dated **13 November 2026**, 12 pages.  
**Official webpage:** https://www.spaceappschallenge.org/resources/judging-awards-guide/  
**Related team file:** [BUILD_TONIGHT.md (archived)](qa/history/markdown-before-cleanup.zip).

This document paraphrases the supplied **2026** guide; it is not based on previous-year rules. Confirm event-local timing with the Local Lead if uncertain.

<a id="judging-checklist--eligibility-and-submission-guide-page-3"></a>

#### Eligibility and submission (guide page 3)

- [ ] Project responds to an official 2026 Space Apps challenge: [Interplanetary Survival Guide: Martian Map](https://www.spaceappschallenge.org/2026/challenges/interplanetary-survival-guide-martian-map/).
- [ ] Every team member is registered for the **same Local Event** and appears in the team **Members** tab; none is waitlisted. Teams have **at most 6 members**.
- [ ] **Local Event teams require at least 1 member** for Global Judging eligibility, so Team Martian may submit solo if appropriately registered. **Universal Event teams require at least 2 members.**
- [ ] Complete **all required fields** on the official team **Project** tab.
- [ ] Provide either a **maximum 30-second video** or **maximum 7-slide presentation** (including intro/title slides).
- [ ] Write the submission and linked materials in **English**. A video may speak another language **if it has English subtitles**.
- [ ] Submit by **Sunday 15 November 2026, 23:59 at the Local Event's local time**; if registered for the Universal Event, use the Team Owner's local time.
- [ ] Agree to the required submission terms, privacy and originality acknowledgments.
- [ ] Put **all external resources** used in the submission's **References** field: code, text, imagery, third-party libraries, NASA datasets and other assets **even if open source or free**. Ensure permission for copyrighted material. Transparently disclose AI assistance used.

**Internal team milestone:** code complete and frozen at **00:00 Sunday 15 November**; demo recorded afterwards. This is **not a NASA rule**.

<a id="judging-checklist--judging-criteria-guide-pages-58"></a>

#### Judging criteria (guide pages 5–8)

All five categories receive a **1–5 score**, at every round.

| Criterion | Official emphasis | Concrete ARES-HUD evidence to demonstrate |
| --- | --- | --- |
| **Impact** | Size/importance of problem and who benefits | Local EVA excursion safety-planning use case, route-to-Hab task; do **not** claim actual flight readiness |
| **Creativity** | Original or meaningfully improved idea | Tactical visor/wrist mini-map framing, scenario-based rerouting with clear interaction |
| **Validity** | Scientific principles, technical and logical feasibility, usability | Working tests, deterministic A*, blocked route handling, transparent simulated inputs, clear limits |
| **Relevance** | Direct challenge fit and NASA data **integral rather than superficial** | Actually integrated NASA map/data, meaningful source-based map interactions, verifiable asset lineage; route costs labeled simulated unless measured |
| **Presentation** | Clearly explain problem, solution and significance | Single reproducible walkthrough from Hab to science target to hazard reroute, backed by clean UI and concise captions |

**Important Relevance warning:** A NASA image used solely as the backdrop for unrelated invented numbers is a weak integration. Treat the app's NASA map as genuine geographic context, record exact source/layer and extent if known, and, if verified numerical measurements exist, show a clearly derived map analysis. Never claim synthetic risk scores are measured science.

<a id="judging-checklist--global-awards-fit-guide-page-12"></a>

#### Global Awards fit (guide page 12)

The guide lists ten award types. **Best Mission Concept** is plausibly relevant to a documented EVA planning concept; **Best Use of Data** requires convincing genuine data use; **Best Use of Technology** may be relevant to the route-planning interaction. These are **possible categories, not scores or endorsements**. All projects are still judged on the five criteria above.

<a id="judging-checklist--from-the-users-pdf-two-critical-copyrightoriginality-cautions"></a>

#### From the user's PDF: two critical copyright/originality cautions

1. You may name the team **Martian** and describe film inspiration, but **do not include copyrighted film clips, branded imagery or music** from *The Martian* without permission.
2. Even a NASA image or free JavaScript library must be **listed in References** with a direct link and credit. Check each asset's usage conditions; do not assume all image copyrights are identical.

<a id="judging-checklist--submission-evidence-register--fill-once-app-exists"></a>

#### Submission evidence register — fill once app exists

| Evidence required | Real value | Check |
| --- | --- | --- |
| Team member/event eligibility | **Confirm with Space Apps account** | [ ] |
| Challenge source resource actually integrated | **See STATUS.md; owner eligibility review pending** | [ ] |
| Exact used NASA URL/layer, year/mission, attribution | **See STATUS.md; owner eligibility review pending** | [ ] |
| App public URL (works without login) | **https://anj-13.github.io/ARES-HUD/ - HTTP checked; full browser/owner acceptance pending** | [ ] |
| Git repository URL/revision | **Working-tree baseline over 5d79741; see STATUS.md** | [ ] |
| All third-party source/library/code/AI references | **Pending actual use** | [ ] |
| Demo URL (≤30 seconds) or slide deck (≤7 slides) | **To do Sunday** | [ ] |
| Space Apps submission confirmed | **To do Sunday before 23:59** | [ ] |

<a id="judging-checklist--reference-urls"></a>

#### Reference URLs

- [Official NASA 2026 Judging & Awards Guide](https://www.spaceappschallenge.org/resources/judging-awards-guide/)
- [Official 2026 challenge](https://www.spaceappschallenge.org/2026/challenges/interplanetary-survival-guide-martian-map/)
- [NASA Mars Trek](https://trek.nasa.gov/mars/)
- [Mars 2020 Perseverance raw images](https://mars.nasa.gov/mars2020/multimedia/raw-images/)

*Accurate status matters more than an inflated demo: only mark capabilities complete when the code and sourced data actually work.*

<a id="changelog"></a>

## CHANGELOG.md

> HISTORICAL RECORD. Read claims and instructions in their original revision context.

<a id="changelog--verified-local-git-history"></a>

### Verified local Git history

Read 15 November 2026 during the final documentation review. These are actual commit messages, not test or deployment acceptance. In particular, 3d20ff4 merges the illustrative Globe branch; the original scientific Task 7 remains separately gated. See [STATUS.md](../STATUS.md).

```text
de93039 Nov-14: added icon for ARES-HUD Mars mission icon (2026-11-15 01:26:46 +0000)
3d20ff4 Merge pull request #3 from Anj-13/3D-globe (2026-11-15 00:52:32 +0000)
c387d80 Clarify global data layer and renderer status (2026-11-15 00:51:35 +0000)
5bf79d8 Update DATA_SOURCES.md for clarity on QA assets (2026-11-15 00:51:16 +0000)
3bfde1b Revise DATA_SOURCES.md for Three.js integration (2026-11-15 00:50:55 +0000)
8a46790 Refactor error handling and result logging in globe QA (2026-11-15 00:50:26 +0000)
c5d0e8f Update README with Globe view availability (2026-11-15 00:49:45 +0000)
f7273cd Merge branch 'main' into 3D-globe (2026-11-15 00:48:09 +0000)
5ea26dc Nov-14: globe test commit (2026-11-15 00:38:55 +0000)
69416e2 Nov-14: readying for the next implementation (2026-11-14 23:41:24 +0000)
fd56ee3 Merge pull request #2 from Anj-13/UI-update (2026-11-14 23:21:30 +0000)
d784fa8 Nov-14: For deployment workflow, (2026-11-14 23:19:36 +0000)
96f0dcf Merge pull request #1 from Anj-13/UI-update (2026-11-14 22:32:56 +0000)
621d381 Nov-14: QA reports (2026-11-14 22:25:03 +0000)
19afd4c Nov-14: Updated UI (2026-11-14 22:23:58 +0000)
f707f92 Nov-14: the legacy with old html, css, js files (2026-11-14 21:41:45 +0000)
0806320 Nov-14: Updating the skeleton (2026-11-14 21:41:11 +0000)
8393743 Nov-14: react-skeleton (2026-11-14 20:51:49 +0000)
e7f5c4d Nov-14: Add tablet feature (2026-11-14 19:49:43 +0000)
500c115 Nov-14: revive the map (2026-11-14 19:04:44 +0000)
0036eac Nov-14: update the map (2026-11-14 17:03:38 +0000)
0662159 Nov-14: Add asset (2026-11-14 17:02:42 +0000)
900198f Nov-14: updated gitignore (2026-11-14 17:01:46 +0000)
5d79741 Nov-14: prototype 1 (2026-11-14 13:56:31 +0000)
af9ac9e Nov-14: Add the initial files (2026-11-14 13:26:47 +0000)
802e097 Nov-14: Added gitignore file (2026-11-14 13:22:15 +0000)
4443777 Initial commit (2026-11-14 13:19:23 +0000)
```

Earlier changelog narratives are preserved in the [snapshot bundle](qa/history/markdown-before-cleanup.zip).
