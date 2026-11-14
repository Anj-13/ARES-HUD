import fs from 'node:fs';
import crypto from 'node:crypto';

const base = 'https://unpkg.com/leaflet@1.9.4/';
const files = [
  ['dist/leaflet.js', 'public/vendor/leaflet/leaflet.js'],
  ['dist/leaflet.css', 'public/vendor/leaflet/leaflet.css'],
  ['dist/images/layers.png', 'public/vendor/leaflet/images/layers.png'],
  ['dist/images/layers-2x.png', 'public/vendor/leaflet/images/layers-2x.png'],
  ['dist/images/marker-icon.png', 'public/vendor/leaflet/images/marker-icon.png'],
  ['dist/images/marker-icon-2x.png', 'public/vendor/leaflet/images/marker-icon-2x.png'],
  ['dist/images/marker-shadow.png', 'public/vendor/leaflet/images/marker-shadow.png'],
  ['LICENSE', 'public/vendor/leaflet/LICENSE']
];

for (const [src, dest] of files) {
  const res = await fetch(base + src);
  if (!res.ok) { console.log('FAIL', src, res.status); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(dest.split('/').slice(0, -1).join('/'), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(dest, buf.length, crypto.createHash('sha256').update(buf).digest('hex'));
}
const head = fs.readFileSync('public/vendor/leaflet/leaflet.js', 'utf8').slice(0, 140);
console.log('header:', head.split('\n')[0]);
