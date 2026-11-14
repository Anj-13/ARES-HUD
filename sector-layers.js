/* Leaflet overlay builders for the simulated sector.
 * Every position comes from geo.js grid maths and is placed by Leaflet.
 * These modules never import pathfinding.js; app.js passes grid/path data in.
 */
import { SECTOR } from './sector.js';
import { gridToLatLng, gridCornerToLatLng } from './geo.js';

const GRID_STYLE = { color: '#5d7d86', weight: 1, opacity: 0.5, interactive: false, pane: 'grid' };
const HAZARD_STYLE = {
  color: '#a85132',
  weight: 1,
  opacity: 0.85,
  fillColor: '#a85132',
  fillOpacity: 0.35,
  interactive: false,
  pane: 'hazards'
};

/** All sector gridlines as individual polylines in the grid pane. */
export function drawGrid(map, renderer) {
  const group = L.layerGroup();
  const style = { ...GRID_STYLE, renderer };
  for (let i = 0; i <= SECTOR.cols; i++) {
    const a = gridCornerToLatLng(SECTOR, i, 0);
    const b = gridCornerToLatLng(SECTOR, i, SECTOR.rows);
    L.polyline([[a.lat, a.lng], [b.lat, b.lng]], style).addTo(group);
  }
  for (let j = 0; j <= SECTOR.rows; j++) {
    const a = gridCornerToLatLng(SECTOR, 0, j);
    const b = gridCornerToLatLng(SECTOR, SECTOR.cols, j);
    L.polyline([[a.lat, a.lng], [b.lat, b.lng]], style).addTo(group);
  }
  return group.addTo(map);
}

/** Blocked cells as merged horizontal rectangles. */
export function drawHazards(group, grid, renderer) {
  group.clearLayers();
  const style = { ...HAZARD_STYLE, renderer };
  for (let y = 0; y < SECTOR.rows; y++) {
    let start = null;
    for (let x = 0; x <= SECTOR.cols; x++) {
      const blocked = x < SECTOR.cols && grid[y][x].blocked;
      if (blocked && start === null) start = x;
      if (!blocked && start !== null) {
        const nw = gridCornerToLatLng(SECTOR, start, y);
        const se = gridCornerToLatLng(SECTOR, x, y + 1);
        L.rectangle(L.latLngBounds([se.lat, se.lng], [nw.lat, nw.lng]), style).addTo(group);
        start = null;
      }
    }
  }
  return group;
}

/** Route polyline from grid cells. */
export function drawRoute(group, path, { dashed = false, color = '#79e9cc', renderer } = {}) {
  if (!path || path.length === 0) return group;
  const points = path.map((p) => {
    const ll = gridToLatLng(SECTOR, p.x, p.y);
    return [ll.lat, ll.lng];
  });
  L.polyline(points, {
    color,
    weight: 4,
    opacity: 0.95,
    dashArray: dashed ? '6 6' : null,
    interactive: false,
    pane: 'routes',
    renderer
  }).addTo(group);
  return group;
}

function markerIcon({ text, kind, label }) {
  return L.divIcon({
    className: `hud-marker hud-marker--${kind}`,
    html: `<button type="button" class="hud-marker__button" aria-label="${label}">${text}</button>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
}

/** Hab, stop and astronaut markers as divIcons with native buttons. */
export function drawMarkers(group, { hab, stops, current, selected = [], onSelectHab, onSelectStop }) {
  group.clearLayers();
  const add = (cell, text, kind, label, onClick) => {
    const ll = gridToLatLng(SECTOR, cell.x, cell.y);
    const marker = L.marker([ll.lat, ll.lng], {
      icon: markerIcon({ text, kind, label }),
      keyboard: true,
      pane: 'markers',
      title: label
    });
    if (onClick) marker.on('click', onClick);
    marker.addTo(group);
    return marker;
  };

  add(hab, 'H', 'hab', 'Hab, simulated position. Plan a route to the Hab', onSelectHab);
  stops.forEach((stop, index) => {
    add(
      stop,
      String(index + 1),
      selected[index] ? 'stop' : 'stop-off',
      `${stop.name}, simulated science stop ${index + 1}. Select as destination`,
      () => onSelectStop(stop)
    );
  });
  if (current && !(current.x === hab.x && current.y === hab.y)) {
    add(current, '●', 'astronaut', 'Simulated current position');
  }
  return group;
}
