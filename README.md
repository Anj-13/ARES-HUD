<p align="center">
  <img src="public/assets/icon/ARES-HUD-icon.svg" alt="ARES-HUD Mars mission icon" width="160" height="160">
</p>

# ARES-HUD

**Mars exploration and simulated astronaut EVA mission planning.**

An educational demonstrator by **Team Martian** for the [NASA Space Apps Challenge 2026: Interplanetary Survival Guide — Martian Map](https://www.spaceappschallenge.org/2026/challenges/interplanetary-survival-guide-martian-map/).

**[Live application](https://anj-13.github.io/ARES-HUD/)** · [Verification status](STATUS.md) · [Documentation](docs/README.md)

## Overview

ARES-HUD combines authentic NASA Mars imagery with a hypothetical surface-exploration workflow. A registered Jezero map provides geographic context for route planning, simulated mission progress and an independent tablet interface. An illustrative 3D overview offers a separate way to explore the interface.

This is the owner's final hackathon submission version, not operational astronaut navigation software. The Globe uses original **SIMULATED artwork**, not NASA imagery or a geographically registered planetary map.

## Features

- **Registered surface map:** local NASA Mars Trek CTX imagery, Leaflet pan/zoom, coordinates, scale, markers and display-layer controls.
- **EVA route planning:** ordered optional science stops, eight-direction A*, simulated dust, before/after routes and emergency Return to Hab. Unreachable routes show an explicit unavailable state.
- **Send to Tablet:** validated input-only snapshots; the tablet independently recalculates routes and handles its own dust, return and reset. Open or copy its URL for another reachable device.
- **Sol timeline:** eight simulated reference excursions, modeled-cost interpolation, playback, mission logs and derived route metrics.
- **Simulated reconnaissance:** revealed planning cells and uncertainty penalties without hiding observed imagery or claiming real sensing.
- **Illustrative Globe:** lazy-loaded Three.js sphere with procedural artwork, rotation/zoom, keyboard controls, WebGL fallback and Explore Jezero. The surface mission survives view changes.
- **Source inspector:** NASA reference images, a separate USGS educational geology PDF/unit key, credits and scientific limitations.

## Technical implementation

React controls update an authoritative mission store. Pure JavaScript modules calculate routes, geographic coordinates/distances, plan serialization, Sol interpolation and simulated reconnaissance. Leaflet exclusively owns the surface viewport/projection; Three.js owns only the illustrative overview.

The hypothetical sector spans 4 km × 4 km with 40 × 40 nominal 100 m cells, registered through the documented WMTS matrix. A* uses orthogonal/diagonal movement and prevents diagonal corner cutting. Traversal penalties and dust are invented scenario inputs, not NASA measurements. Independent tablet stores receive inputs and recompute results.

Vite builds two static entries, `index.html` and `tablet.html`. Local assets and vendored libraries allow the tested runtime flow to operate without NASA API requests, a backend or credentials. See [Architecture](docs/ARCHITECTURE.md).

## Tech stack

| Component | Verified technology |
| --- | --- |
| Interface | React 18.3.1, React DOM 18.3.1 |
| Development/build | Vite 6.0.0 |
| Surface map | Leaflet 1.9.4, locally vendored |
| Illustrative Globe | Three.js r160, locally vendored |
| Icons | Lucide React 0.468.0 |
| Mission engines | JavaScript ES modules |
| Verification | Node test runner; Playwright Core 1.51.1 with installed Microsoft Edge |
| Static hosting | GitHub Pages; GitHub Actions builds `dist/` |

Dependency purposes, transitive packages and license locations are in [THIRD_PARTY.md](docs/THIRD_PARTY.md).

## Project structure

```text
ARES-HUD/
├── README.md, STATUS.md, LICENSE
├── index.html, tablet.html, vite.config.js
├── package.json, package-lock.json
├── .github/workflows/pages.yml
├── src/
│   ├── components/       React mission, map, tablet, globe and source views
│   ├── domain/           Pure routing, geography, plans, Sols and reconnaissance
│   ├── integrations/     Leaflet, tablet and React adapters
│   ├── state/            Authoritative mission store
│   └── styles/           Interface styling
├── public/
│   ├── assets/           Cached NASA/USGS files and source manifests
│   ├── vendor/leaflet/   Vendored surface library and license
│   ├── docs/             Generated source-disclosure copies
│   └── licenses/         Generated runtime license copies
├── vendor/three/         Vendored renderer, license and manifest
├── tests/                Node tests
├── scripts/              Build, browser QA and acquisition tools
├── docs/                 Architecture, provenance, policies and QA evidence
└── legacy/               Recoverable earlier application and assets/tests
```

`dist/`, `node_modules/` and browser caches are generated outputs, not source deliverables. The original UI handoff scaffold was removed; its [integration notes](docs/qa/history/react-ui-handoff-readme.txt) are preserved.

## Getting started

### Requirements

Use **Node.js 24** and npm, matching the Pages workflow. The release audit used Node 24.22.1 and npm 11.19.1. A modern browser is required; Globe rendering additionally needs WebGL, with Surface Mode available as fallback. Browser QA scripts require installed Microsoft Edge.

```sh
git clone https://github.com/Anj-13/ARES-HUD.git
cd ARES-HUD
npm ci
npm run dev
```

Open the address printed by Vite, normally http://127.0.0.1:5173/. Windows PowerShell users can use `npm.cmd` if needed. No API key, backend or environment-secret configuration is required.

## Production build and deployment

```sh
npm run build
npm run preview
```

The deployable website is generated in **`dist/`**. Publish the built output: raw root HTML contains entry points that require Vite processing. The build copies source disclosures and runtime licenses into the site, retaining both entries, relative paths, local imagery and Leaflet. Three.js is bundled into the lazy Globe chunk and its license is copied separately.

The checked-in [Pages workflow](.github/workflows/pages.yml) runs `npm ci`, `npm test` and `npm run build`, uploads **only `dist/`**, and deploys the artifact. It runs on pushes to `main` or manual dispatch. This audit does not push, dispatch, publish or change Pages settings. HTTP availability is verified separately from workflow configuration and full public-browser acceptance; see [STATUS.md](STATUS.md).

## Usage

1. Select, include or reorder hypothetical science stops, then choose **Plan selected traverse**.
2. **Simulate dust hazard** to compare the original route with a detour. Use **Simulate arrival at next stop** or **Return to Hab**; reset to repeat.
3. Explore the Sol timeline and optionally enable simulated reconnaissance. Distances are derived geographic calculations; costs and progress remain simulated.
4. Choose **Send to Tablet**. It receives a snapshot and recalculates locally. A separate phone needs access to the hosted site; there is no real-time synchronization.
5. Open **GLOBE**, rotate/zoom the illustrative sphere, then **Explore Jezero** to return to planning. Open **SOURCES** for provenance and limitations.

## Testing and verification

```sh
npm test
npm run build
npm run test:production
```

Additional existing checks: `npm run test:browser`, `npm run test:legacy`, and `node scripts/globe-qa.mjs`.

Node tests cover A*, mission composition, geography, plan validation, Sol interpolation, reconnaissance, state adapters and tile integrity. Production browser QA tests the built site under a nested path at desktop/tablet/mobile widths and reduced motion. Browser emulation does not certify physical devices or astronaut safety.

Executed results, logs and outstanding checks are in [STATUS.md](STATUS.md) and [final audit evidence](docs/qa/final-release/audit.json).

## NASA data sources and scientific integrity

The surface cache contains **24 NASA Mars Trek CTX tiles** at levels 10–12, with separate NASA/USGS context assets:

- **MRO CTX preliminary Jezero mosaic:** NASA/JPL-Caltech/MSSS, via Mars Trek.
- **THEMIS PIA23386:** NASA/JPL-Caltech/Arizona State University.
- **Perseverance PIA24485:** NASA/JPL-Caltech/ASU/MSSS; regional context, not a photograph at a hypothetical waypoint.
- **USGS educational geology:** Sun and Stack (2020), [SIM 3464](https://doi.org/10.3133/sim3464), a separate educational PDF/unit key, not a registered routing layer.

[DATA_SOURCES.md](docs/DATA_SOURCES.md) preserves exact acquisition URLs, credits, sizes, SHA-256 hashes and metadata gaps. The [asset inventory](docs/assets/README.md) maps repository/deployed paths. Historical acquisition records are dated evidence; a local hash check does not re-certify remote availability or reuse permissions.

| Class | Meaning |
| --- | --- |
| OBSERVED | Genuine NASA orbital/surface imagery |
| DERIVED | Verified coordinate arithmetic, route lengths and bearings |
| INTERPRETED | Published geology/unit explanations and regional delta interpretation |
| SIMULATED | Hypothetical sector/astronaut positions, stops, costs, dust, Sol schedules, reconnaissance and procedural Globe artwork |

There is **no numerical elevation model, slope analysis, live telemetry or operational terrain-safety inference**. Registration does not prove safe EVA placement or traversability. NASA endorsement is not implied.

## Third-party software and licenses

Application code is [MIT licensed](LICENSE), copyright 2026 Anjila Gurung. React/React DOM, Three.js and Vite use MIT; Leaflet uses BSD-2-Clause; Lucide React uses ISC; Playwright Core uses Apache-2.0. Transitive dependencies and exact license files are listed in [THIRD_PARTY.md](docs/THIRD_PARTY.md). Scientific assets retain their own source credits and applicable terms.

## AI-assisted development

AI coding assistants supported implementation, integration, testing and documentation. Project records disclose OpenAI Codex and prior OpenCode/DeepSeek assistance. This does not attribute the original project idea to AI or imply independent scientific validation by an assistant. Scientific claims and provenance require explicit source verification.

## Project status and limitations

This repository contains the owner's final hackathon submission version. [STATUS.md](STATUS.md) is the authoritative acceptance register. Local verification does not establish official submission, event eligibility, an exact deployed commit or owner private-window approval.

Physical phone/touch, screen-reader, cross-browser and sustained GPU/heap profiling remain limited or unverified. Sol playback follows a fixed simulated reference excursion; reconnaissance is modeled planning uncertainty, not sensor detection. The Globe has no NASA texture, geographic registration or real rover markers. QR transfer, real-time sync, a backend and accounts are absent.

**Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.**

## Future work

Separate future capabilities include geographically verified global Mars imagery/mission markers, numerical elevation/slope after validation, and additional device handoff/synchronization. They remain subject to source, permission, technical and owner-approval gates.

## Documentation

Start with the [documentation index](docs/README.md) for [architecture](docs/ARCHITECTURE.md), [source provenance](docs/DATA_SOURCES.md), [software licenses](docs/THIRD_PARTY.md), [verification status](STATUS.md) and technical evidence. [NASA judging/submission references](docs/JUDGING_CHECKLIST.md) remain available for the owner's final portal checks.

## License

[MIT License](LICENSE) for application software. Third-party software and scientific assets retain their applicable license and attribution terms.
