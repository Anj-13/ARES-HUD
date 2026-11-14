import {mountMissionControls} from './mission-controls.js';
import { planMission, moveStop } from './mission.js';
import { createGrid } from './pathfinding.js';
import { SECTOR } from './sector.js';
import { createSectorMap } from './map.js';
import { drawGrid, drawHazards, drawRoute, drawMarkers } from './sector-layers.js';
import { gridToLatLng, latLngToGrid, metersBetween, sectorSpanMeters } from './geo.js';

const $ = (id) => document.getElementById(id);
const HAB = SECTOR.hab;
const DEST = SECTOR.stops[0];

const state = {
  hazard: false,
  current: { x: HAB.x, y: HAB.y },
  goal: { x: DEST.x, y: DEST.y, name: DEST.name },
  mission: false,
  override: null,
  stops: SECTOR.stops.map((stop) => ({ ...stop, selected: true }))
};

let features;
let tileMessage = '';
let lastZoom = 12;

function renderTileStatus() {
  const parts = [];
  if (tileMessage) parts.push(tileMessage);
  if (lastZoom > view.maxNativeZoom) {
    parts.push(`Overzoomed: level ${view.maxNativeZoom} imagery enlarged to zoom ${lastZoom}; no extra detail is added.`);
  }
  $('tile-status').textContent = parts.join(' ');
}

function updateReadout(latlng) {
  const cell = latLngToGrid(SECTOR, latlng);
  $('readout').textContent = cell
    ? `DERIVED position: ${latlng.lat.toFixed(5)} N, ${latlng.lng.toFixed(5)} E · grid cell ${cell.x}, ${cell.y} (row 0 = north)`
    : `DERIVED position: ${latlng.lat.toFixed(5)} N, ${latlng.lng.toFixed(5)} E · outside the simulated sector`;
}

const view = createSectorMap($('sector-map'), {
  zoom: 12,
  onTileError: () => {
    tileMessage = 'Some cached orbital tiles are unavailable. Routing is independent of imagery.';
    renderTileStatus();
  },
  onZoomChange: (zoom) => {
    lastZoom = zoom;
    renderTileStatus();
  },
  onPointer: updateReadout
});

const gridLayer = drawGrid(view.map, view.renderer);
const hazardLayer = L.layerGroup().addTo(view.map);
const routeLayer = L.layerGroup().addTo(view.map);
const markerLayer = L.layerGroup().addTo(view.map);

const span = sectorSpanMeters(SECTOR);
$('sector-extent').textContent =
  `SIMULATED sector ${SECTOR.id}: ${SECTOR.bounds.west.toFixed(5)}-${SECTOR.bounds.east.toFixed(5)} E, ` +
  `${SECTOR.bounds.south.toFixed(5)}-${SECTOR.bounds.north.toFixed(5)} N · ` +
  `${SECTOR.cols} × ${SECTOR.rows} cells · ${SECTOR.cellMetres} m nominal · ` +
  `measured ${span.northSouth.toFixed(0)} m × ${span.eastWest.toFixed(0)} m (DERIVED).`;

function trailMetres(path) {
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += metersBetween(gridToLatLng(SECTOR, path[i - 1].x, path[i - 1].y), gridToLatLng(SECTOR, path[i].x, path[i].y));
  }
  return total;
}

const sameRoute = (a, b) =>
  Boolean(a && b && a.path.length === b.path.length && a.path.every((p, i) => p.x === b.path[i].x && p.y === b.path[i].y));

function draw() {
  features?.leave();
  features?.reveal(state.current);
  const baseGrid = features ? features.grid() : createGrid(state.hazard);
  const grid = state.override ? state.override(baseGrid) : baseGrid;
  const targets = state.mission ? state.stops.filter((stop) => stop.selected) : [state.goal];
  const result = planMission(grid, state.current, targets);
  const before = state.hazard ? planMission(features ? features.grid(false) : createGrid(), state.current, targets) : null;

  hazardLayer.clearLayers();
  if ($('hazards-visible').checked) drawHazards(hazardLayer, grid, view.renderer);

  routeLayer.clearLayers();
  if (before && before.path) drawRoute(routeLayer, before.path, { dashed: true, color: '#bac4ca', renderer: view.renderer });
  if (result && result.path) drawRoute(routeLayer, result.path, { renderer: view.renderer });

  drawMarkers(markerLayer, {
    hab: HAB,
    stops: state.stops,
    current: state.current,
    selected: state.stops.map((stop) => stop.selected),
    onSelectHab: () => {
      state.mission = false;
      state.goal = { x: HAB.x, y: HAB.y, name: 'Hab' };
      draw();
    },
    onSelectStop: (stop) => {
      state.mission = false;
      state.goal = { x: stop.x, y: stop.y, name: stop.name };
      draw();
    }
  });

  $('status').textContent = !result
    ? 'No route available'
    : result.path.length === 1
      ? 'Already at destination'
      : state.mission
        ? 'Science traverse planned'
        : state.goal.name === 'Hab'
          ? 'Route to Hab'
          : 'Route to science waypoint';
  $('details').textContent = result
    ? `${result.path.length - 1} grid steps · ${result.cost.toFixed(2)} simulated cost units · ${trailMetres(result.path).toFixed(0)} m great-circle trail (DERIVED)`
    : 'Selected position or destination is blocked, or no traversable connection exists.';

  const noDetour = 'SIMULATED HAZARD active. ';
  $('scenario').textContent = !state.hazard
    ? 'Dust scenario clear. Select “Simulate dust hazard” to block a fixed region across the outbound route.'
    : result && !targets.length
      ? noDetour + 'No science stops are selected, so there is no route for the dust zone to affect.'
      : result && result.path.length === 1
        ? noDetour + 'Start and destination are the same grid cell, so the dust zone applies no detour.'
        : !result
          ? noDetour + 'No complete route exists with the dust zone' + (before ? '; the dashed line is the last pre-hazard route.' : '.')
          : !before
            ? noDetour + 'No pre-hazard route existed for this plan, so there is nothing to compare.'
            : sameRoute(result, before)
              ? noDetour + 'The recomputed route is unchanged; this plan needs no detour.'
              : noDetour + 'Dashed line shows the route before the dust zone; solid line shows the recomputed route.';

  $('hazard').setAttribute('aria-pressed', String(state.hazard));
  $('hazard').textContent = state.hazard ? 'Clear simulated dust hazard' : 'Simulate dust hazard';

  $('sequence').replaceChildren(
    ...targets.map((p, i) => {
      const li = document.createElement('li');
      li.textContent = `${p.name || (p === HAB ? 'Hab' : 'Science')} · ${result ? result.segments[i].cost.toFixed(2) + ' simulated cost' : 'No complete route'}`;
      return li;
    })
  );
}

function science() {
  state.mission = false;
  state.goal = { x: DEST.x, y: DEST.y, name: DEST.name };
  draw();
}

$('science').onclick = science;
$('hazard').onclick = () => {
  state.hazard = !state.hazard;
  draw();
};
$('position').onchange = () => {
  state.current = $('position').value === 'hab' ? { x: HAB.x, y: HAB.y } : $('position').value === 'science' ? { x: DEST.x, y: DEST.y } : state.current;
  draw();
};
$('return').onclick = () => {
  state.mission = false;
  state.goal = { x: HAB.x, y: HAB.y, name: 'Hab' };
  draw();
};
$('reset').onclick = () => {
  features?.resetKnowledge();
  state.hazard = false;
  state.current = { x: HAB.x, y: HAB.y };
  state.goal = { x: DEST.x, y: DEST.y, name: DEST.name };
  state.mission = false;
  state.stops.forEach((stop) => (stop.selected = true));
  $('position').value = 'hab';
  renderStops();
  draw();
};

function renderStops() {
  $('stops').replaceChildren();
  state.stops.forEach((stop, i) => {
    const row = document.createElement('div');
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = stop.selected;
    check.onchange = () => {
      stop.selected = check.checked;
      draw();
    };
    label.append(check, stop.name);
    row.append(label);
    const info = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Science objective';
    const p = document.createElement('p');
    p.textContent = stop.objective;
    info.append(summary, p);
    row.append(info);
    for (const [text, offset] of [['Move earlier', -1], ['Move later', 1]]) {
      const b = document.createElement('button');
      b.textContent = text;
      b.disabled = i + offset < 0 || i + offset >= state.stops.length;
      b.onclick = () => {
        state.stops = moveStop(state.stops, i, offset);
        renderStops();
        draw();
      };
      row.append(b);
    }
    $('stops').append(row);
  });
}

renderStops();
$('plan').onclick = () => {
  state.mission = true;
  draw();
};
$('markers-visible').onchange = () => {
  if (features?.active) { features.preview(); return; }
  if ($('markers-visible').checked) markerLayer.addTo(view.map);
  else markerLayer.remove();
};
$('hazards-visible').onchange = draw;
$('trek-visible').onchange = () => {
  if ($('trek-visible').checked) view.tiles.addTo(view.map);
  else view.tiles.remove();
};
$('opacity').oninput = (event) => {
  view.tiles.setOpacity(Number(event.target.value));
};
$('zoom-in').onclick = () => view.map.zoomIn(1);
$('zoom-out').onclick = () => view.map.zoomOut(1);
$('reset-view').onclick = () => view.resetView();

$('arrive').onclick = () => {
  const next = state.stops.find((stop) => stop.selected);
  if (!next || !planMission(createGrid(state.hazard), state.current, [next])) return;
  state.current = { x: next.x, y: next.y };
  next.selected = false;
  state.mission = true;
  let option = $('position').querySelector('[value="arrival"]');
  if (!option) {
    option = document.createElement('option');
    option.value = 'arrival';
    $('position').append(option);
  }
  option.textContent = 'Simulated arrival: ' + next.name;
  $('position').value = 'arrival';
  renderStops();
  draw();
};

draw();
renderTileStatus();

// Test-only hooks for browser-test.html; unused by the demo UI.
window.__aresHudTest = {
  view,
  state,
  layers: { gridLayer, hazardLayer, routeLayer, markerLayer },
  setGridOverride(fn) {
    state.override = fn;
    draw();
  },
  clearGridOverride() {
    state.override = null;
    draw();
  },
  triggerTileError() {
    view.probeTileError();
  }
};

features=mountMissionControls({view,state,draw,baseLayers:{routeLayer,markerLayer},getTargets:()=>state.mission?state.stops.filter(s=>s.selected):[state.goal]});
