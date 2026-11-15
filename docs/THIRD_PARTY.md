# Third-party software

React 18.3.1 and React DOM 18.3.1 (MIT) implement the owner-supplied JSX interface and lifecycle. Scheduler 0.23.2 (MIT) is React DOM's runtime dependency. Lucide React 0.468.0 (ISC) supplies the handoff's icons. These are the supplied handoff's packages, pinned for reproducibility, rather than a replacement visual system. Licenses are copied from installed packages to `public/licenses/` during every build and included in `dist/licenses/`.

Leaflet 1.9.4 (BSD-2-Clause), already approved and vendored, remains the only surface viewport owner. It handles projection, tiles, interaction, scale and attribution, which would substantially exceed a small bespoke adapter. Its original files and full license remain in `public/vendor/leaflet/` and the recoverable legacy snapshot. No CDN or plugin is used.

Vite 6.0.0 (MIT) is build/development tooling, explicitly authorized by the owner's React migration request. Playwright Core 1.51.1 (Apache-2.0) is browser verification tooling and uses installed Microsoft Edge; it is excluded from runtime output. Their transitive packages and resolved versions are recorded in `package-lock.json`; original package license files remain in `node_modules/`.

The application is MIT licensed; `dist/LICENSE` contains its license. No new imagery or scientific datasets were acquired during this migration. NASA/USGS credits, original URLs, asset sizes, hashes and limitations remain in [DATA_SOURCES.md](DATA_SOURCES.md). Codex assisted integration and verification; prior implementation reports OpenCode/DeepSeek assistance.

## Illustrative globe
Three.js r160, MIT, vendored in vendor/three/ with licence and SHA-256 manifest. Reused from the verified local spike; lazily bundled by Vite. Provides WebGL geometry/material/resource lifecycle support. Globe texture is original procedural code artwork (512x256), covered by the project MIT licence; no NASA image or disputed Trek mosaic is used.
