# Asset inventory and path mapping

[DATA_SOURCES.md](../DATA_SOURCES.md) preserves full source URLs, credits, acquisition notes, byte counts, SHA-256 and scientific limitations. This entry point maps assets without duplicating those tables.

| Repository source | Built/deployed path | Role |
| --- | --- | --- |
| `public/assets/trek/{level}/{row}-{col}.png` | `assets/trek/{level}/{row}-{col}.png` | 24 genuine Jezero CTX tiles: 2 at level 10, 6 at level 11, 16 at level 12 |
| `public/assets/trek/manifest.json` | `assets/trek/manifest.json` | Exact tile URL, level/row/col, file path, bytes and SHA-256 |
| `public/assets/trek-capabilities.xml`, `trek-source.json`, `trek-catalog.json` | `assets/` with the same filenames | Retained acquisition/service metadata, not a new live response |
| `public/assets/jezero-themis.jpg` | `assets/jezero-themis.jpg` | NASA PIA23386 orbital reference, separate from the grid |
| `public/assets/perseverance-delta.jpg` | `assets/perseverance-delta.jpg` | NASA PIA24485 surface reference, not located at a hypothetical stop |
| `public/assets/icon/ARES-HUD-icon.svg` | `assets/icon/ARES-HUD-icon.svg` | Owner-confirmed generated website icon; generator and reuse terms were not specified; not NASA imagery |
| `public/assets/jezero-geology.pdf`, `geology-service.json` | `assets/` with the same filenames | Separate USGS educational PDF/unit key and researched service metadata |
| `public/vendor/leaflet/` | `vendor/leaflet/` | Leaflet 1.9.4 JS/CSS/images and `LICENSE` |
| `vendor/three/three.module.js`, `LICENSE`, `manifest.json` | Globe chunk under `assets/`; `licenses/three/LICENSE` | Three.js r160 software; source/manifest are build inputs, not NASA imagery |
| `docs/DATA_SOURCES.md`, `docs/THIRD_PARTY.md`, `docs/assets/README.md` | `docs/` with the same relative document names | Generated disclosures; originals remain in repository docs/ |

The CTX cache totals **1,356,690 bytes**; all 24 PNGs are 256 × 256 px. The final audit checks actual files against [the manifest](../../public/assets/trek/manifest.json). Deployed paths are website-relative and work under `/ARES-HUD/`.

The illustrative Globe has **no downloaded planetary texture**: src/components/PlanetaryGlobe.jsx generates original deterministic 512 × 256 procedural Canvas artwork. It is **SIMULATED**, not NASA observations, geographic registration or a rover-location source. [THIRD_PARTY.md](../THIRD_PARTY.md) records library/license locations and build copies.

## Acquisition, verification and recovery

- scripts/fetch-tiles.mjs and scripts/vendor-leaflet.mjs are acquisition tools, separate from runtime use.
- docs/qa/ retains source probes, figures, screenshots, test evidence and historical Markdown snapshots. They are not required runtime inputs.
- .browser-qa/ contains ignored local profiles/results and disposable experiments. Global MGS MOC tiles acquired there are **QA-only**, not the production Globe texture.
- legacy/ retains earlier source/assets/vendor/tests for recovery; it is not the production entry.

No numeric elevation raster, slope dataset, real-time feed or operational terrain-safety measurement is included. OBSERVED imagery, DERIVED geographic calculations, INTERPRETED geology and SIMULATED mission/artwork remain distinct. USGS PDF page 2 is the key; maps are pages 1 and 3. No PDF/THEMIS pixel inference establishes registration or safe traversal.
