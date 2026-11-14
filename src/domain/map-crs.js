/* MarsEQ: Mars geographic coordinate reference system for Leaflet.
 *
 * The Trek WMTS matrix for Jezero_CTX_BlockAdj_dd is a plain geographic grid on
 * the Mars 2000 sphere: origin -180, 90, 180/2^L degrees per 256 px tile.
 * Leaflet's EPSG4326 transformation already produces exactly that grid
 * (zoom 0 = 512 x 256 px world, one tile per 180 degrees), so MarsEQ only
 * replaces the sphere radius used by distance calculations.
 *
 * Leaflet stays the only screen-projection owner. Nothing here converts
 * lon/lat to pixels.
 */
export const MARS_RADIUS = 3396190;
export const METRES_PER_DEGREE = (2 * Math.PI * MARS_RADIUS) / 360;

/** Build the Mars CRS. Call after leaflet.js has defined window.L. */
export function createMarsEq(L = globalThis.L) {
  if (!L) throw new Error('Leaflet must be loaded before map-crs.js is used');
  return L.extend({}, L.CRS.EPSG4326, {
    code: 'MarsEQ',
    R: MARS_RADIUS,
    projection: L.Projection.LonLat,
    // Same transformation as EPSG4326: -180,90 -> 0,0 and 180,-90 -> world size.
    transformation: new L.Transformation(1 / 180, 1, -1 / 180, 0.5)
  });
}

export const MARS_EQ = () => createMarsEq();

/** Great-circle distance in metres on the Mars 2000 sphere. */
export function marsDistance(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * MARS_RADIUS * Math.asin(Math.min(1, Math.sqrt(h)));
}
