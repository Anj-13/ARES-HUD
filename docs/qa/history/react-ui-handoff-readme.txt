# ARES-HUD React UI handoff

Figma reference: https://www.figma.com/design/KRhDzngAouWSkuSxHsBguY/ARES-HUB?node-id=2-2

This is a **UI-only** React/Vite handoff. It is intentionally independent of the original repository and does not contain original NASA map tiles, A* calculations, simulation logic, or a working tablet handoff. The map uses a clearly labeled CSS illustrative preview, **not NASA imagery**. Route metrics show em dashes until connected. Do not ship this preview as a fully working scientific demonstrator.

## Run

```bash
npm install
npm run dev
npm run build
```

## Integration contracts

- `src/components/MapPanel.jsx`: replace `.map-demo` with the existing Leaflet integration. Retain `#mars-map` as the map container and initialize Leaflet with a ref/effect, not on every render. Remove the preview terrain, markers, and watermark once live tiles and overlays are connected. Preserve attribution and coordinate registration. Map controls must call the live map.
- `src/components/MissionPanel.jsx`: `stops`, `onToggle`, `onMove`, `onPlan`, `onArrival`, `onSelect`, `selectedId`, `status`. Connect these to existing mission and plan modules.
- `src/components/TelemetryPanel.jsx`: `position`, `hazard`, `onHazard`, `onReturn`, `onReset`, `metrics`. Replace placeholder metrics with existing calculations; preserve no-route and error states.
- `src/components/Timeline.jsx`: `sol`, `setSol`, `playing`, `setPlaying`, `progress`, `setProgress`. Hook into `sols.js`, not a new independent simulator.
- `src/components/TabletView.jsx`: visual-only handoff preview. Connect the existing `tablet.js` and `tablet.html`, retaining independent route recomputation and validation.
- `src/components/SourcesView.jsx`: replace generic sources with original verified repository source list, attribution, and mission notes.
- `src/components/Modal.jsx`: focus management, Escape, backdrop dismissal and focus restoration provided.
- `src/App.jsx`: currently owns **demo state**. Replace with one authoritative React state adapter backed by original modules; avoid competing global state.
- Globe: intentionally a planned-feature placeholder.

## Safe repository layout (target, not automatically applied)

```
project/
  AGENTS.md  README.md  STATUS.md  LICENSE
  package.json  index.html  vite.config.js
  public/
    assets/                 # existing licensed imagery/assets, preserve paths
    vendor/                 # existing vendored Leaflet files
  src/
    main.jsx  App.jsx
    components/             # files in this handoff
    styles/main.css
    data/demo.js            # remove demo data after wiring
    domain/
      pathfinding.js  geo.js  map-crs.js  plan.js
      mission.js  sector.js  sols.js  fog.js
      datasets.js  exploration.js  sector-layers.js
    integrations/
      leaflet-map.js        # extracted from existing map.js
      tablet-bridge.js      # extracted from existing tablet.js
    state/
      mission-store.js      # authoritative React adapter
  tests/                    # preserve all existing *.test.js
  scripts/                  # preserve existing scripts
  docs/                     # preserve original documentation
  legacy/                   # original app.js, index.html, styles.css etc until verified
```

Move files only after examining imports, relative paths, static hosting assumptions, and `AGENTS.md`. Preserve `UI/`, `initial-files/`, `vendor/`, `browser-test.html`, `serve.py` and all QA evidence until the migration has passed. `mission-controls.js` likely belongs in integrations or should be superseded by the React MissionPanel only after feature parity.
