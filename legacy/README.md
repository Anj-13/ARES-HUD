# Recoverable original implementation

This directory retains the pre-React static app, pure modules, original tests and browser harness, NASA/USGS files, Leaflet license, previous UI workspace (including its local ignored dependencies), and initial-files snapshot. From repository root run `python serve.py --directory legacy --port 8013`, then open http://localhost:8013/.

The original harness is browser-test.html; the root `npm run test:legacy` runs it in Edge at desktop, 360 px and reduced motion. Original Node tests can be run from this directory with `npm test`. This snapshot remains until the owner chooses to remove it. Acquisition/runtime assets are also in `../public/` for the React build. Old documentation links may refer to the historical root; current docs are in `../docs/`.

`migration-scripts/` contains historical one-time migration scripts for audit only. Do not rerun them against the migrated repository. No original UI, handoff, source asset or historical QA evidence was discarded.
