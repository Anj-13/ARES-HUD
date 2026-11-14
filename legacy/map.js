/* Leaflet map factory for Surface Mode. Leaflet owns pan, zoom, touch,
 * keyboard, tile loading, lat/lng-to-screen projection and the scale bar.
 * This module never converts lon/lat to pixels itself.
 */
import { MARS_EQ } from './map-crs.js';
import { SECTOR, TILE_BOUNDS, MIN_ZOOM, MAX_NATIVE_ZOOM, MAX_ZOOM } from './sector.js';

export const PANE_Z = { tiles: 200, grid: 410, hazards: 420, fog: 430, routes: 450, markers: 600 };

export function createSectorMap(element, options = {}) {
  const {
    zoom = 12,
    tileTemplate = 'assets/trek/{z}/{y}-{x}.png',
    onTileError = () => {},
    onZoomChange = () => {},
    onPointer = () => {},
    interactive = true
  } = options;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bounds = L.latLngBounds(
    [TILE_BOUNDS.south, TILE_BOUNDS.west],
    [TILE_BOUNDS.north, TILE_BOUNDS.east]
  );

  const map = L.map(element, {
    crs: MARS_EQ(),
    center: [SECTOR.centre.lat, SECTOR.centre.lng],
    zoom,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    maxBounds: bounds,
    maxBoundsViscosity: 1,
    keyboard: interactive,
    dragging: interactive,
    touchZoom: interactive,
    scrollWheelZoom: interactive,
    doubleClickZoom: interactive,
    boxZoom: interactive,
    attributionControl: false,
    zoomAnimation: !reduced,
    fadeAnimation: !reduced,
    markerZoomAnimation: !reduced,
    inertia: !reduced,
    preferCanvas: true
  });

  // The whole sector is the unit of interest, so fit it rather than assume a
  // fixed zoom: a narrow tablet screen then still shows the Hab and the stops.
  const sectorBounds = L.latLngBounds(
    [SECTOR.bounds.south, SECTOR.bounds.west],
    [SECTOR.bounds.north, SECTOR.bounds.east]
  );
  function fitSector(animate = false) {
    map.fitBounds(sectorBounds, { padding: [8, 8], maxZoom: zoom, animate });
  }
  fitSector();

  for (const [name, z] of Object.entries(PANE_Z)) {
    if (name === 'tiles') continue;
    const pane = map.createPane(name);
    pane.style.zIndex = String(z);
  }

  const tiles = L.tileLayer(tileTemplate, {
    tileSize: 256,
    minZoom: MIN_ZOOM,
    maxNativeZoom: MAX_NATIVE_ZOOM,
    maxZoom: MAX_ZOOM,
    noWrap: true,
    bounds,
    keepBuffer: 2,
    attribution: 'NASA/JPL-Caltech/MSSS, via NASA Mars Trek'
  }).addTo(map);

  const renderer = L.canvas({ padding: 0.5 });

  tiles.on('tileerror', () => onTileError('tile'));
  map.on('mousemove', (event) => onPointer({ lat: event.latlng.lat, lng: event.latlng.lng }));
  map.on('zoomend', () => onZoomChange(map.getZoom(), MAX_NATIVE_ZOOM));

  L.control.scale({ imperial: false, position: 'bottomleft', maxWidth: 140 }).addTo(map);
  L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

  function resetView() {
    fitSector();
  }

  /** Force a tile error against a deliberately missing template, for tests. */
  function probeTileError() {
    const probe = L.tileLayer('assets/absent-tile-{z}-{y}-{x}.png', {
      tileSize: 256,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      noWrap: true
    }).addTo(map);
    probe.on('tileerror', () => onTileError('probe'));
    setTimeout(() => probe.remove(), 800);
  }

  return { map, tiles, renderer, bounds, resetView, probeTileError, maxNativeZoom: MAX_NATIVE_ZOOM };
}
