/* Fetch the cached Trek tiles that cover the sector plus a one-tile margin.
 *
 * Idempotent: existing files are hashed, not re-downloaded. Writes
 * assets/trek/manifest.json with level, row, col, URL, bytes and SHA-256.
 * Run: node scripts/fetch-tiles.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { SECTOR, TILE_BOUNDS, MIN_ZOOM, MAX_NATIVE_ZOOM } from '../src/domain/sector.js';
import { tileRange } from '../src/domain/geo.js';

const TEMPLATE =
  'https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/{z}/{row}/{col}.png';
const ROOT = path.resolve(import.meta.dirname, '..');

const entries = [];
let added = 0;
let addedBytes = 0;

for (let level = MIN_ZOOM; level <= MAX_NATIVE_ZOOM; level++) {
  const range = tileRange(TILE_BOUNDS, level);
  for (let row = range.rowMin; row <= range.rowMax; row++) {
    for (let col = range.colMin; col <= range.colMax; col++) {
      const rel = `assets/trek/${level}/${row}-${col}.png`;
      const abs = path.join(ROOT, 'public', rel);
      let buf;
      if (fs.existsSync(abs)) {
        buf = fs.readFileSync(abs);
      } else {
        const url = TEMPLATE.replace('{z}', level).replace('{row}', row).replace('{col}', col);
        const res = await fetch(url);
        if (!res.ok) {
          console.log(`FAIL ${level}/${row}/${col} HTTP ${res.status}`);
          continue;
        }
        buf = Buffer.from(await res.arrayBuffer());
        if (buf.subarray(1, 4).toString() !== 'PNG') {
          console.log(`FAIL ${level}/${row}/${col} not a PNG`);
          continue;
        }
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        fs.writeFileSync(abs, buf);
        added++;
        addedBytes += buf.length;
      }
      entries.push({
        level,
        row,
        col,
        url: TEMPLATE.replace('{z}', level).replace('{row}', row).replace('{col}', col),
        file: rel,
        bytes: buf.length,
        sha256: crypto.createHash('sha256').update(buf).digest('hex')
      });
    }
  }
}

entries.sort((a, b) => a.level - b.level || a.row - b.row || a.col - b.col);
fs.writeFileSync(path.join(ROOT, 'public/assets/trek/manifest.json'), JSON.stringify(entries, null, 2) + '\n');

const total = entries.reduce((sum, e) => sum + e.bytes, 0);
console.log(`sector ${SECTOR.id}: ${entries.length} tiles in manifest (${(total / 1024).toFixed(1)} KiB)`);
console.log(`downloaded ${added} new tiles, ${(addedBytes / 1024).toFixed(1)} KiB added`);
