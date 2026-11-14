/* Sector definition: the hypothetical 4 km x 4 km operating area.
 *
 * Placement (SIMULATED / HYPOTHETICAL, not a real mission sector):
 * Task 0 compared level-11/12 CTX imagery with the USGS SIM 3464 sketch and put
 * the Jezero delta front near 18.5-18.55 N, 77.42-77.45 E. The centre below is
 * chosen so the delta front, the inlet channel mouth and its southern lobe all
 * fall inside one 4 km square, with the Hab on the western approach.
 *
 * Geometry is arithmetic on the Mars 2000 sphere (R = 3,396,190 m): a 4 km
 * north-south span is 4000 / 59274.6975 degrees; the east-west span divides by
 * cos(latitude). Every number here is derived, not measured from pixels.
 */
import { METRES_PER_DEGREE } from './map-crs.js';

const CENTER = { lat: 18.51, lng: 77.425 };
const HALF_LAT = 2000 / METRES_PER_DEGREE; // 0.03374120971623044 deg
const HALF_LON = 2000 / (METRES_PER_DEGREE * Math.cos((CENTER.lat * Math.PI) / 180)); // 0.03558192456320505 deg

const BOUNDS = {
  north: CENTER.lat + HALF_LAT,
  south: CENTER.lat - HALF_LAT,
  west: CENTER.lng - HALF_LON,
  east: CENTER.lng + HALF_LON
};

export const SECTOR = {
  id: 'jezero-sector-1',
  name: 'Western Jezero delta approach',
  classification: 'SIMULATED',
  centre: CENTER,
  bounds: BOUNDS,
  halfLat: HALF_LAT,
  halfLon: HALF_LON,
  rows: 40,
  cols: 40,
  cellMetres: 100,
  // One 256 px tile at the deepest verified level (12).
  tileMargin: 180 / 4096,
  hab: { x: 4, y: 20 },
  // Positions are hypothetical grid cells. Names state the concept only.
  stops: [
    {
      id: 'delta-front',
      name: 'Delta front concept',
      x: 23,
      y: 14,
      objective:
        'Hypothetical comparison of layered sediments at the delta front; regional delta context in PIA24485.'
    },
    {
      id: 'channel-mouth',
      name: 'Channel mouth concept',
      x: 14,
      y: 10,
      objective:
        'Hypothetical inspection of the inlet channel where it opens into the fan. No measured stratigraphy.'
    },
    {
      id: 'distal-lobe',
      name: 'Distal lobe concept',
      x: 28,
      y: 26,
      objective:
        'Hypothetical survey of the southern fan lobe before returning to the Hab. Position is invented.'
    }
  ]
};

export const TILE_BOUNDS = {
  north: BOUNDS.north + SECTOR.tileMargin,
  south: BOUNDS.south - SECTOR.tileMargin,
  west: BOUNDS.west - SECTOR.tileMargin,
  east: BOUNDS.east + SECTOR.tileMargin
};

/** Deepest verified WMTS level for the cached tiles. */
export const MAX_NATIVE_ZOOM = 12;
export const MIN_ZOOM = 10;
export const MAX_ZOOM = MAX_NATIVE_ZOOM + 2;
