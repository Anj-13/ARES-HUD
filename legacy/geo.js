/* Pure sector and grid maths. No Leaflet, no DOM, no pixel projection.
 *
 * Grid convention: 40 x 40 cells, 100 m nominal, row 0 = north, column 0 = west.
 * A cell (x, y) is addressed by its centre; corner lattice points run 0..40.
 */
import { MARS_RADIUS } from './map-crs.js';

const RAD = Math.PI / 180;

export function cellLat(sector) {
  return (sector.bounds.north - sector.bounds.south) / sector.rows;
}

export function cellLng(sector) {
  return (sector.bounds.east - sector.bounds.west) / sector.cols;
}

/** Centre of integer cell (x, y) as {lat, lng}. */
export function gridToLatLng(sector, x, y) {
  return {
    lat: sector.bounds.north - (y + 0.5) * cellLat(sector),
    lng: sector.bounds.west + (x + 0.5) * cellLng(sector)
  };
}

/** Corner lattice point (i, j), i/j in 0..cols/rows. */
export function gridCornerToLatLng(sector, i, j) {
  return {
    lat: sector.bounds.north - j * cellLat(sector),
    lng: sector.bounds.west + i * cellLng(sector)
  };
}

/** Cell containing a coordinate, or null when outside the sector. */
export function latLngToGrid(sector, latlng) {
  const lat = latlng.lat;
  const lng = latlng.lng;
  if (lat > sector.bounds.north || lat < sector.bounds.south) return null;
  if (lng < sector.bounds.west || lng > sector.bounds.east) return null;
  const x = Math.floor((lng - sector.bounds.west) / cellLng(sector));
  const y = Math.floor((sector.bounds.north - lat) / cellLat(sector));
  return { x: Math.min(x, sector.cols - 1), y: Math.min(y, sector.rows - 1) };
}

/** Great-circle distance in metres on the Mars 2000 sphere. */
export function metersBetween(a, b) {
  const sinLat = Math.sin(((b.lat - a.lat) * RAD) / 2);
  const sinLng = Math.sin(((b.lng - a.lng) * RAD) / 2);
  const h = sinLat * sinLat + Math.cos(a.lat * RAD) * Math.cos(b.lat * RAD) * sinLng * sinLng;
  return 2 * MARS_RADIUS * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Initial bearing from a to b in degrees, 0 = north, clockwise. */
export function bearing(a, b) {
  const lat1 = a.lat * RAD;
  const lat2 = b.lat * RAD;
  const dLng = (b.lng - a.lng) * RAD;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (Math.atan2(y, x) / RAD + 360) % 360;
}

/** WMTS tile indices for a coordinate. Used by the tile download script and readouts. */
export function tileIndex(lng, lat, level) {
  const span = 180 / 2 ** level;
  return {
    level,
    row: Math.floor((90 - lat) / span),
    col: Math.floor((lng + 180) / span)
  };
}

/** Measured spans of the sector edges in metres (great-circle). */
export function sectorSpanMeters(sector) {
  const midLat = (sector.bounds.north + sector.bounds.south) / 2;
  const midLng = (sector.bounds.east + sector.bounds.west) / 2;
  return {
    northSouth: metersBetween(
      { lat: sector.bounds.south, lng: midLng },
      { lat: sector.bounds.north, lng: midLng }
    ),
    eastWest: metersBetween(
      { lat: midLat, lng: sector.bounds.west },
      { lat: midLat, lng: sector.bounds.east }
    )
  };
}

/** Tile ranges needed to cover bounds at a level, inclusive. */
export function tileRange(bounds, level) {
  const nw = tileIndex(bounds.west, bounds.north, level);
  const se = tileIndex(bounds.east, bounds.south, level);
  return { level, rowMin: nw.row, rowMax: se.row, colMin: nw.col, colMax: se.col };
}
