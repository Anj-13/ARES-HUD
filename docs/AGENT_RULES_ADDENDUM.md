# AGENT_RULES_ADDENDUM.md — Owner amendments to AGENTS.md

**Owner:** Team Martian (Anjila Gurung)
**Status:** Active. Read this file immediately after `AGENTS.md`. Original task prompts are preserved in [project history](HISTORY.md#agent-tasks), not a current work queue.
**Precedence:** Where this addendum and `AGENTS.md` / `BUILD_TONIGHT.md` disagree, **this addendum wins**, for the explicitly scoped approvals and rules in this addendum (including schedule, static architecture and viewport ownership). Everything else in `AGENTS.md` still applies, including all provenance and honesty rules.

Historical companions: [feature plan](HISTORY.md#feature-plan) and [original task prompts](HISTORY.md#agent-tasks). Current structure is in [architecture](ARCHITECTURE.md); current acceptance is in [STATUS.md](../STATUS.md).

---

## 1. Explicit owner approvals (override the AGENTS.md "MUST NOT" list)

`AGENTS.md` forbids certain features "until the owner explicitly approves". The owner approves the following, **with the limits shown**:

| Item | Approval | Limits that still apply |
| --- | --- | --- |
| 3D Mars globe / Planetary Mode (Task 7) | APPROVED FEATURE VISION; verification spike only at first | New scoped exception to the old globe prohibition. Depends on verified Task 1; separate owner go/no-go required for full implementation. Cannot displace Tier A or B. No renderer or new globe asset approved yet. |
| Registered map (grid anchored to real Mars lon/lat on the Trek CTX tiles) | APPROVED | Hab and waypoints remain `HYPOTHETICAL`. Registration comes only from the WMTS tile matrix, never from pixel colour or brightness. |
| Sol timeline / mission-control view | APPROVED | All Sol content is `SIMULATED`. No real Mars clock, weather or telemetry. |
| "Send to Tablet" handoff and tablet view | APPROVED | Original artwork only. No frames, screenshots, fonts, music or interface designs from the film *The Martian*. No backend. |
| Fog of War | APPROVED (was forbidden) | Must be labelled `SIMULATED RECONNAISSANCE`. Must never imply real obstacle detection. Must never hide real orbital imagery as if it were unobserved (see Task 6 in `AGENT_TASKS.md`). |
| Terrain-aware cost from elevation | APPROVED **conditionally** | Only after the Task 5 verification spike succeeds. If no georeferenced elevation product is verified, stop; do not substitute shaded relief, screenshots or brightness. |
| Leaflet as the single map viewport and projection owner | APPROVED (pre-approved dependency) | Version 1.9.x only, pinned, vendored in /vendor/leaflet/, no CDN, no plugins without justification, licence file kept. |
| Leaving 4 km grid conceptual | SUPERSEDED | The target 4 km x 4 km sector would use a verified lon/lat bounding box after Task 1 acceptance; the current grid remains conceptual. It is still a hypothetical operating area, not a verified safe zone. |

### Still forbidden (other prohibitions retained)

LiDAR or real obstacle detection; live Mars weather; radiation physics; suit oxygen or battery forecasting; communications simulation; "astronaut-safe" range rings; geological sand-trap or traversability classification from geology; automatic georeferencing by pixel colour; paid cloud; accounts or auth backend; custom domain; real-time sync server; NASA-looking synthetic imagery; any claim of NASA endorsement or flight suitability.

---

## 2. Schedule policy (OWNER APPROVED — OPTION 2)

Historical schedule: the owner reported submission complete on 17 November 2026. These November 15 checkpoints are preserved for context; they are not upcoming deadlines. Continuing scoped approvals and scientific verification gates elsewhere in this addendum still apply.

**Owner decision:** Option 2 is selected. **New code freeze: Sunday 15 November 2026, 16:00 GMT (Europe/London).** The original Saturday 14 November midnight freeze is superseded for this release. Official NASA Space Apps submission remains **Sunday 15 November 2026, 23:59 event-local time**; confirm the event-local deadline in the project portal. If the event-local deadline is GMT, the freeze leaves **7 hours 59 minutes** for the maximum 30-second video, final checks, References and submission; otherwise calculate the buffer in the verified event timezone.

- [ ] Option 1 — keep midnight freeze (NOT SELECTED).
- [x] **Option 2 — extend freeze to Sunday 15 November 2026, 16:00 GMT (SELECTED / OWNER APPROVED).** Tier B is authorized after Tier A passes acceptance; authorization does not mean a feature is already implemented.

### Revised release gates (Europe/London, GMT)

| Gate | Sunday 15 November | Required action |
| --- | --- | --- |
| Feature cutoff | **13:30** | Start no new feature work or spikes; finish or revert active work, including Tasks 5/7. Full Task 7 go/no-go must precede this gate. |
| Dependency/data freeze | **14:30** | No new dependencies, datasets or architecture changes. |
| Public deployment verification | **15:15** | Verify live URL in a private window and test critical demo path. |
| Final commit | **15:45** | Commit the verified release candidate and record its hash. |
| **Code freeze** | **16:00** | Stop feature and code changes; preserve demo-ready state. |
| Video + submission buffer | **After 16:00; before event-local 23:59** | Record <=30-second demo, validate credits/references; convert the verified event timezone before scheduling submission. |

The original `AGENTS.md` Saturday gates (21:30 / 22:30 / 23:15 / 23:45) are replaced by the Sunday gates above; do not add the old gates to the new schedule a second time.

| Tier | Tasks | Authorization |
| --- | --- | --- |
| A | 0 Preflight, 0D Docs baseline, 1 Registered map (Leaflet), 3 Send to Tablet | **Required first**, in that order; skip/reconcile only if already verified in `STATUS.md`. |
| B | 2 Sol timeline, then 6 Fog of War | **Approved**, but only after Tier A is green and before the 13:30 feature cutoff. |
| Gated feature | 7 3D Mars globe | Verification spike after verified Task 1, only if Tier A/B time is protected. Full implementation requires a successful spike and separate owner approval before 13:30; never displaces A/B. |
| C | 5 Terrain-aware cost | **Spike only** (60 minutes maximum), when time permits. Step 2 implementation requires a qualifying numeric elevation product **and separate explicit owner approval**. |

**Priority order:** preserve a working Tier A demo > finish Task 2 > finish Task 6 > optional gated Task 7 / Task 5 investigations, only with protected release time. Do not sacrifice deployment or submission time for Tier B/C or Task 7. Each task's own stop point remains binding. If a task is not green by its stop point or the release gate, revert to the last green commit and report. A smaller working demo beats a larger broken one.

---

## 3. Shared rules (apply to every task)

1. **Static hosting.** Section 7 explicitly approves React + Vite integration and its build step. Use current package.json commands; deploy dist/ as static files with no backend, API keys or external runtime dependency. Cache verified imagery under public/assets/ and retain the recoverable legacy implementation. Globe/terrain dependencies remain separately gated.
2. **Keep `pathfinding.js` pure.** Do not change its public behaviour. All existing tests must keep passing (`npm test`, currently 39 tests under tests/; see STATUS.md for current evidence). New logic gets new tests.
3. **Data classes stay visible** in the UI and in the data model: `OBSERVED`, `DERIVED`, `INTERPRETED`, `SIMULATED`.
   - Terrain imagery: `OBSERVED`.
   - Lon/lat of grid cells computed from the WMTS matrix: `DERIVED` (arithmetic, not measurement).
   - Sector placement, Hab, waypoints, hazards, costs, Sol schedule, fog reveal radius: `SIMULATED`.
   - Geology units: `INTERPRETED`.
   - Never label anything `OBSERVED` or `DERIVED` unless it truly is.
4. **Never invent** coordinates, rover image metadata, elevation, slope thresholds presented as standards, NASA quotes or provenance. Unknowns are `null` and shown as "not established".
5. **Dependencies.** Leaflet 1.9.x and the pinned React/Vite/Lucide dependencies in section 7 are owner-approved; see THIRD_PARTY.md. New dependencies remain gated. A vendored library is allowed only if (a) it cannot be reasonably written in under ~150 lines, (b) it is placed in `/vendor/<name>/` with its LICENSE file, (c) it is listed in README and in the Space Apps References field draft. State the reason in the report.
6. **Assets.** Anything added to `assets/` gets: source URL, credit, date retrieved, bytes and SHA-256 in `DATA_SOURCES.md` and `assets/trek/manifest.json` (or the relevant manifest). Do not scrape the USGS ArcGIS tile service (access is SECURE, tile export disabled).
7. **Accessibility baseline.** Native controls, visible focus, keyboard-operable timeline and buttons, `prefers-reduced-motion` respected, hazard state never conveyed by colour alone, usable at 360 px width.
8. **Persistent disclaimer** stays visible on every view including the tablet: "Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation."
9. **Original art only.** No *The Martian* footage, stills, logos, screenshots, music or recreated UI.
10. **Encoding.** All text files UTF-8. Do not leave "?" where a dash or special character was intended.
11. **Git.** `.gitignore` ignores `*.md`: new or edited documentation must be added with `git add -f`. Add `.browser-qa/` to `.gitignore` (local browser profile, hundreds of cache files, must not be committed or deployed). Commit after each green task with a message of the form `task-N: <summary>`.
12. **AI disclosure.** Record any AI assistant actually used in README (the Space Apps References field requires it).
13. **One viewport owner per scale.** Leaflet alone owns pan, zoom, touch, keyboard, tile loading and lat/lng-to-screen projection in Surface Mode (mission control and tablet). A separately approved 3D renderer may own only Planetary Mode, never the 2D map. Task 7 must not embed another surface viewport or require 3D on the tablet. For Surface Mode, do not write CSS-transform pan/zoom, a second lon/lat-to-pixel function or manual pixel overlay positioning; let Leaflet own them. Verified globe/texture coordinate mapping belongs only to the separately approved Planetary renderer. `geo.js` holds only pure sector and grid maths (grid cells, metres, bearing, tile indices for the download script) and must not import Leaflet. `pathfinding.js` never imports Leaflet.
14. **Documentation sync.** `STATUS.md` (created in Task 0D) is the only file allowed to say a feature is DONE. Every task ends by updating its row (status, commit, evidence) and by moving text from `ARCHITECTURE.md` Part B (target) to Part A (current) only after it is verified by a command or browser check. Never describe planned work in the present tense outside Part B.

---

## 4. Required report format (end of every task)

```
TASK N REPORT
Files added / changed:
Commands run and actual output (npm test, node --check, browser checks):
Verified in a real browser (what, which browser, which width):
NOT verified:
Data classes touched / labels added:
Assets added (source, credit, bytes, hash):
Docs updated:
Open risks and decisions for the owner:
```

Do not claim a feature works unless it was run. "Verified by inspection" must be labelled as such.

---

## 5. Definition of done for the demo (target flow)

1. Open the app and see real Jezero orbital imagery with a lon/lat readout and scale bar.
2. See the 4 km sector grid sitting on that imagery, with a hypothetical Hab and science stops.
3. Plan a multi-stop route; scrub the Sol timeline and watch the trail grow.
4. Press **Send to Tablet**; the wrist tablet receives the plan and shows heading, distance and Return to Hab.
5. Trigger a dust hazard on the tablet; it reroutes locally. Press Return to Hab.
6. Inspect the source and provenance cards; every item is labelled `OBSERVED`, `DERIVED`, `INTERPRETED` or `SIMULATED`.

Tier A delivers steps 1, 2, 4, 5 and 6. Tier B adds step 3.
## 6. v0.3 Planetary Mode gate and presentation

Task 7 is a NEW scoped exception only for a genuine Mars globe with verified mission markers and a transition to/from the registered Surface Mode. NASA Eyes on the Earth is an interaction reference, not an embedded API or permission to copy its interface. Original artwork only; *The Martian* is narrative inspiration only, with no recreated copyrighted screens, frames, UI, logos, music, fonts or footage.

The planned full flow is globe -> source-linked rover or hypothetical ARES-HUD sector -> registered 2D map -> multi-stop EVA -> Send to Tablet -> simulated dust/replan -> Return to Hab. A rover selection opens factual context, never teleports a Gale traverse onto Jezero; only the ARES-HUD sector enters the hypothetical EVA. Return to Planetary Mode must preserve the surface plan. The verified Surface Mode remains the direct entry/fallback if WebGL, assets, the spike or the full implementation gate fails. See Task 7 for the 60-minute spike and acceptance. Do not execute it during this documentation change.

Unknown coordinates, epochs, credits, licenses and globe asset sizes remain not established. Section 7 approves the React integration dependencies in addition to Leaflet; any globe renderer choice, exact pin/license, dependency justification and asset/download/GPU-memory limits need an owner decision after the spike. No CDN, runtime network dependency, paid service or backend is authorized by this feature vision. Its globe exception does not approve new build tooling; the existing Vite build is separately approved by section 7.


## 7. Explicit React integration request — 14 November 2026

The owner explicitly requested integration of the supplied `react-ui-handoff/`, migration to React + Vite, a maintainable `src/`/`public/`/`tests/` layout, recoverable original implementation, original functionality and regression verification. This supersedes section 3 rule 1's build deferral and permits the supplied React, React DOM, Lucide icons and Vite build tooling. The built application remains statically hostable without a backend or runtime external service. Pinned browser test tooling is development-only. The globe remains a placeholder in this migration; no full renderer or numerical terrain integration is authorized. Other provenance, schedule, accessibility and verification gates remain applicable. See THIRD_PARTY.md for dependency justification and ../STATUS.md for evidence.

## 8. Owner-authorized illustrative Globe scope

The reduced-scope procedural Globe is merged in 3d20ff4 and described in [SIMPLIFIED_GLOBE_REPORT.md](HISTORY.md#simplified-globe-report). This exception permits original explicitly SIMULATED artwork and vendored Three.js r160 for an illustrative overview only. It is not NASA imagery, a registered map or a source of rover coordinates. Original scientific Task 7 and numerical terrain gates remain in force. No acceptance claim is made here; consult [STATUS.md](../STATUS.md).
