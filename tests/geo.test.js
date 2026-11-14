import test from 'node:test';
import assert from 'node:assert/strict';
import { SECTOR, TILE_BOUNDS } from '../src/domain/sector.js';
import {
  gridToLatLng,
  gridCornerToLatLng,
  latLngToGrid,
  metersBetween,
  bearing,
  tileIndex,
  tileRange,
  sectorSpanMeters,
  cellLat,
  cellLng
} from '../src/domain/geo.js';
import { METRES_PER_DEGREE } from '../src/domain/map-crs.js';

test('grid to latlng and back round-trips for corners and centre', () => {
  for (const [x, y] of [[0, 0], [SECTOR.cols - 1, 0], [0, SECTOR.rows - 1], [SECTOR.cols - 1, SECTOR.rows - 1], [20, 20]]) {
    const back = latLngToGrid(SECTOR, gridToLatLng(SECTOR, x, y));
    assert.deepEqual(back, { x, y }, `cell ${x},${y}`);
  }
});

test('grid points stay inside the sector bounds', () => {
  const inside = (p) =>
    p.lat < SECTOR.bounds.north &&
    p.lat > SECTOR.bounds.south &&
    p.lng > SECTOR.bounds.west &&
    p.lng < SECTOR.bounds.east;
  assert.ok(inside(gridToLatLng(SECTOR, 0, 0)));
  assert.ok(inside(gridToLatLng(SECTOR, 39, 39)));
  assert.ok(inside(gridToLatLng(SECTOR, 20, 20)));
  assert.ok(inside(SECTOR.centre));
});

test('corners are the sector bounds and row 0 is north', () => {
  const nw = gridCornerToLatLng(SECTOR, 0, 0);
  const se = gridCornerToLatLng(SECTOR, 40, 40);
  assert.ok(Math.abs(nw.lat - SECTOR.bounds.north) < 1e-12);
  assert.ok(Math.abs(nw.lng - SECTOR.bounds.west) < 1e-12);
  assert.ok(Math.abs(se.lat - SECTOR.bounds.south) < 1e-12);
  assert.ok(Math.abs(se.lng - SECTOR.bounds.east) < 1e-12);
  assert.ok(gridToLatLng(SECTOR, 0, 0).lat > gridToLatLng(SECTOR, 0, 39).lat);
});

test('sector spans 4000 m north-south and east-west within 1 m', () => {
  const span = sectorSpanMeters(SECTOR);
  assert.ok(Math.abs(span.northSouth - 4000) <= 1, `north-south ${span.northSouth}`);
  assert.ok(Math.abs(span.eastWest - 4000) <= 1, `east-west ${span.eastWest}`);
});

test('cell size is 100 m nominal within 1 m', () => {
  const ns = cellLat(SECTOR) * METRES_PER_DEGREE;
  const ew = cellLng(SECTOR) * METRES_PER_DEGREE * Math.cos((SECTOR.centre.lat * Math.PI) / 180);
  assert.ok(Math.abs(ns - 100) <= 1, `north-south cell ${ns}`);
  assert.ok(Math.abs(ew - 100) <= 1, `east-west cell ${ew}`);
});

test('metersBetween and bearing agree with the sphere', () => {
  const a = gridToLatLng(SECTOR, 20, 20);
  const north = { lat: a.lat + 1, lng: a.lng };
  const south = { lat: a.lat - 1, lng: a.lng };
  const east = { lat: a.lat, lng: a.lng + 1 };
  assert.ok(Math.abs(metersBetween(a, north) - 59274.6975) <= 1);
  assert.ok(Math.abs(bearing(a, north)) < 1e-6 || Math.abs(bearing(a, north) - 360) < 1e-6);
  assert.ok(Math.abs(bearing(a, south) - 180) < 0.2);
  assert.ok(Math.abs(bearing(a, east) - 90) < 0.2);
  assert.ok(metersBetween(a, a) === 0);
});

test('tileIndex matches the WMTS matrix at levels 10, 11 and 12', () => {
  // Same points asserted in the Leaflet spike checks.
  const p10 = tileIndex(-180 + (1463 * 180) / 1024, 90 - (403 * 180) / 1024, 10);
  assert.deepEqual(p10, { level: 10, row: 403, col: 1463 });
  const p11 = tileIndex(77.45, 18.45, 11);
  assert.deepEqual(p11, { level: 11, row: 814, col: 2929 });
  const p12 = tileIndex(-180 + (5858 * 180) / 4096, 90 - (1628 * 180) / 4096, 12);
  assert.deepEqual(p12, { level: 12, row: 1628, col: 5858 });
});

test('tile ranges cover the sector margin and match the cached set', () => {
  assert.deepEqual(tileRange(TILE_BOUNDS, 12), { level: 12, rowMin: 1625, rowMax: 1628, colMin: 5856, colMax: 5859 });
  assert.deepEqual(tileRange(TILE_BOUNDS, 11), { level: 11, rowMin: 812, rowMax: 814, colMin: 2928, colMax: 2929 });
  assert.deepEqual(tileRange(TILE_BOUNDS, 10), { level: 10, rowMin: 406, rowMax: 407, colMin: 1464, colMax: 1464 });
});

test('coordinates outside the sector return null', () => {
  assert.equal(latLngToGrid(SECTOR, { lat: SECTOR.bounds.north + 0.01, lng: SECTOR.centre.lng }), null);
  assert.equal(latLngToGrid(SECTOR, { lat: SECTOR.centre.lat, lng: SECTOR.bounds.west - 0.01 }), null);
});
