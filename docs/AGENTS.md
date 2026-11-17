# ARES-HUD operating instructions

Read [the current overview](../README.md), [STATUS.md](../STATUS.md), [owner addendum](AGENT_RULES_ADDENDUM.md), [feature plan](HISTORY.md#feature-plan) and [task specifications](HISTORY.md#agent-tasks). The addendum takes precedence for its owner-approved exceptions. STATUS.md alone records task acceptance; consult existing acceptance before repeating work.

## Current workflow

- React + Vite integration is explicitly approved by addendum section 7. Keep the built application entirely static, with no backend, account, API key or external runtime service.
- Preserve the original pure mission engines in src/domain/, the authoritative mission store, Leaflet-only surface projection and the recoverable legacy/ implementation. See [ARCHITECTURE.md](ARCHITECTURE.md) and [migration map](HISTORY.md#react-migration-report--moved-reused-and-modified-files).
- Keep current overview/status at the repository root and supporting documentation in docs/. docs/README.md is the navigation index. Update current evidence and status after verified implementation changes; never repeat historical counts as current.
- Supporting evidence is in [baseline closure](HISTORY.md#baseline-closure-report), [migration report](HISTORY.md#react-migration-report) and docs/qa/. Superseded Markdown originals are preserved in the [snapshot bundle](qa/history/markdown-before-cleanup.zip); they are not active instructions.

## Scope and scientific integrity

Preserve the registered 40 x 40, 4 km x 4 km hypothetical Jezero sector, selectable/ordered science stops, deterministic A*, dust rerouting, no-route handling and Return to Hab. Preserve validated independent tablet planning, simulated Sol timeline and simulated reconnaissance. Do not infer implemented features from the plan; check STATUS.md.

Use OBSERVED only for genuine documented imagery/data, DERIVED for verified arithmetic, INTERPRETED for sourced geological interpretation and SIMULATED for hypothetical placements, costs, hazards, schedules and sensor effects. Nominal cells are 100 m, not boulder-scale scans. No invented coordinates, rover metadata, NASA observations, slope measurements, source credits or safety limits. Unknown facts remain not established. [DATA_SOURCES.md](DATA_SOURCES.md) owns exact resource URLs, credits, hashes, local paths and limitations.

The original scientific Task 7 globe and Task 5 numerical terrain remain separately gated. The owner-authorized illustrative procedural Globe is a separate merged exception documented in addendum section 8. No full renderer or terrain-cost implementation without the specified verification and explicit owner go/no-go. No live weather, radiation/suit forecasting, real obstacle detection, geological safety classification, paid cloud, authentication, real-time sync server or NASA endorsement claims. Original artwork only; no copyrighted film assets or recreated film UI.

Persistent warning: **Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.**

## Routing and verification

Keep eight-direction A*: orthogonal weight 1, diagonal sqrt(2), no cutting between blocked orthogonal neighbors; entering-cell cost is step length * (1 + max(0, penalty)), blocked endpoints/no paths return no route, stable tie handling and Euclidean admissible heuristic. No straight-line fallback through a barrier. Recompute after destination, hazard and Return to Hab changes.

Run the relevant checks from package.json and report actual commands/results. Node tests do not prove browser, public-host, accessibility or flight-safety acceptance. Preserve NASA/USGS attribution, third-party licenses and all actually used AI-tool disclosures. Inspect [JUDGING_CHECKLIST.md](HISTORY.md#judging-checklist) for owner submission responsibilities; official/account requirements remain separately verified.

## Schedule and handoff

The owner reported submission complete on 17 November 2026. The dated release schedule below is retained as history, not a future deadline or instruction to repeat submitted work. Continuing scientific, architecture and verification constraints above remain in force.

Option 2 supersedes old Saturday/midnight instructions. All internal checkpoints are Sunday 15 November 2026 GMT: feature cutoff 13:30, dependency/data freeze 14:30, deployment verification 15:15, final commit 15:45, code freeze 16:00. Tier A remains 0/0D/1/3; Tier B 2/6 follows verified Tier A. Separate gates protect release time for Tasks 5/7. Demo video follows freeze. Official submission is event-local 23:59; owner verifies timezone and portal status. Preserve a working demo at each cutoff.
