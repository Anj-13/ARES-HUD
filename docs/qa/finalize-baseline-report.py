"""Write the evidence-backed Task 0/0D/1 closure record after verification."""
from pathlib import Path
import json
import re
import shutil

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'docs/qa/baseline-closure'
def load(name):return json.loads((OUT/name).read_text(encoding='utf-8'))
def write(path,text):(ROOT/path).write_text(text,encoding='utf-8')
facts=load('repository-facts.json');geo=load('geography-integrity.json');checks=load('registered-map-checks.json')
assert not checks['errors'] and len(checks['runs'])==2
head=facts['head'].split()[0][:7]
missing=[r['id'] for r in facts['historicalCommitClaims'] if not r['verifiedLocalObject']]
max_marker=max(m['error'] for run in checks['runs'] for z in run['measurements'] for m in z['markers'])
max_route=max(z['maxRouteError'] for run in checks['runs'] for z in run['measurements'])
descriptions={
'AGENTS.md':('CURRENT REQUIREMENTS','Operating instructions with latest owner build exception.'),
'AGENT_RULES_ADDENDUM.md':('CURRENT REQUIREMENTS','Owner approvals, release gates, static hosting and separate feature gates.'),
'AGENT_TASKS.md':('CURRENT REQUIREMENTS','Original acceptance prompts; historical paths mapped by migration report.'),
'ARCHITECTURE.md':('CURRENT','Verified React/store/Leaflet responsibilities and gated target section.'),
'ARCHITECTURE_PRE_REACT.md':('HISTORICAL','Preserved pre-React component/state architecture.'),
'ARES_HUD_ONE_DAY_AUDIT.md':('HISTORICAL','Original feasibility and judging assumptions; findings now annotated.'),
'AUDIT_CURRENT.md':('HISTORICAL','Earlier independent audit; its outstanding reconciliation is superseded by this record.'),
'BASELINE_CLOSURE_REPORT.md':('CURRENT EVIDENCE','Task 0/0D/1 closure checks, provenance, full document inventory and limitations.'),
'BUILD_TONIGHT.md':('HISTORICAL','Original Saturday plan; Sunday schedule in owner addendum supersedes it.'),
'CHANGELOG.md':('CURRENT / HISTORICAL','Actual local Git history followed by preserved historical narrative.'),
'CODEX_OPTION_2_HANDOFF.md':('CURRENT REQUIREMENTS','Owner task sequencing and Option 2 handoff; no task completion evidence.'),
'DATA_SOURCES.md':('CURRENT SOURCE REGISTER','Verified assets/credits/hashes; acquisition phases explicitly historical.'),
'DOCS_CHANGE_REPORT_V03.md':('HISTORICAL','Documentation-only v0.3 vision changes; no current implementation claim.'),
'FEATURE_IMPLEMENTATION_REPORT.md':('HISTORICAL EVIDENCE','Pre-React tablet/timeline/recon verification, superseded by migration evidence.'),
'FEATURE_PLAN.md':('CURRENT REQUIREMENTS','Feature vision, simulation labels and separately gated features.'),
'FIX_REPORT.md':('HISTORICAL','Original af9ac9e stabilization findings with updated finding tags.'),
'GATED_FEATURE_SPIKES.md':('CURRENT INVESTIGATION','Recorded globe/elevation spike limits; full-feature gates remain applicable.'),
'INTEGRATION_REPORT.md':('HISTORICAL','Original Phase 2 source/mission integration, not current cache inventory.'),
'JUDGING_CHECKLIST.md':('CURRENT REQUIREMENTS / UNVERIFIED EXTERNAL','Owner submission checklist; portal/official-event details are not certified here.'),
'MAP_ARCHITECTURE.md':('HISTORICAL','Original three-space design; link now points to actual current architecture.'),
'MAP_RECOVERY_REPORT.md':('HISTORICAL','Local server/cache recovery evidence, not current server instructions.'),
'QA_REPORT.md':('HISTORICAL','Original QA H1/H2/M1/M2/L1/L2 findings with current individual annotations.'),
'REACT_MIGRATION_REPORT.md':('CURRENT EVIDENCE','Directory/file map, integration and browser/build evidence; readout supplement in this report.'),
'README.md':('CURRENT','Exhaustive classified navigation for every supporting Markdown file.'),
'RESOURCE_GAP_AUDIT.md':('HISTORICAL','Original resource capability table, reconciled against current features and remaining terrain gaps.'),
'TASK_0D_REPORT.md':('HISTORICAL','Prior baseline/report claims; local commit objects checked in current evidence.'),
'TASK_0_REPORT.md':('HISTORICAL','Earlier preflight; page-2-sketch claim corrected in this record.'),
'TASK_1_REPORT.md':('HISTORICAL','Original Leaflet measurements; rerun and tightened in current checks.'),
'TEST_REPORT.md':('HISTORICAL','Original eight-test report; current counts and evidence are in STATUS/report.'),
'THIRD_PARTY.md':('CURRENT','Pinned package purposes, full license locations and AI disclosure.'),
'toolgiven.md':('HISTORICAL SOURCE REFERENCE','Owner-provided Global Offers list; external offer availability not re-certified.'),
'assets/README.md':('CURRENT','Correct public/ path mapping and 24-tile asset register entry.'),
'status-from-otheragent/Opencode-DeepSeek-V4.1-flash-free-work.md':('HISTORICAL','Other-agent notes; implementation/commit claims not authoritative.'),
'status-from-otheragent/README.md':('HISTORICAL','Old overview/commands; dead architecture anchor repaired.'),
'status-from-otheragent/STATUS.md':('HISTORICAL','Archived status snapshot; root STATUS alone is authoritative.'),
}
# Include this report before enumerating the navigation.
report=ROOT/'docs/BASELINE_CLOSURE_REPORT.md'
if not report.exists():report.write_text('# Baseline closure report\n',encoding='utf-8')
all_docs=sorted(p.relative_to(ROOT/'docs').as_posix() for p in (ROOT/'docs').rglob('*.md'))
assert set(all_docs)==set(descriptions),(set(all_docs)-set(descriptions),set(descriptions)-set(all_docs))
navigation='''# Documentation navigation

[Current overview](../README.md) · [Authoritative status](../STATUS.md) · [Baseline closure evidence](BASELINE_CLOSURE_REPORT.md)

Every supporting Markdown document is classified below. CURRENT REQUIREMENTS are owner instructions/plans, not implementation claims. HISTORICAL records retain original observations and times under explicit banners; current finding tags point to fresh evidence. Only root STATUS.md records task acceptance. Source, route and safety claims are limited to the evidence described.

| Document | Classification | Purpose / reconciliation |
| --- | --- | --- |
'''
for name in all_docs:
    category,description=descriptions[name];navigation+=f'| [{name}]({name}) | {category} | {description} |\n'
navigation+='\n[QA evidence directory](qa/) contains retained original screenshots, migration evidence and baseline-closure JSON/PDF-render/contact-sheet figures. Historical root file paths map through the [migration map](REACT_MIGRATION_REPORT.md#moved-reused-and-modified-files); original application files remain in `legacy/`. No historical record was deleted.\n'
write('docs/README.md',navigation)

matrix='\n'.join(f"| {r['level']} | {r['width']} | {r['height']} |" for r in geo['matrices'])
geometry='\n'.join(f"| {r['level']} | {r['degreesPerTile']} | {r['degreesPerPixel']} | {r['metresPerPixelNS']:.4f} | {r['metresPerPixelEW18_51N']:.4f} |" for r in geo['geometry'])
measurements='\n'.join(f"| {r['width']} | {r['initial']['zoom']} | {r['extent']['northSouth']:.6f} | {r['extent']['eastWest']:.6f} | {r['extent']['cellWidthPixels']:.1f} |" for r in checks['runs'])
def responsibility(entry):
    p=Path(entry['file']);name=p.stem
    if p.suffix=='.html':return 'HTML entry; scripts: '+(', '.join(entry['htmlScripts']) or 'none / inline harness or fixture')
    if '.test' in name:return 'Automated tests for '+name.replace('.test','')
    names={'pathfinding':'Deterministic pure A* and simulated grid.','mission':'Multi-leg route accumulation, ordering and layer state.','geo':'Pure sector/grid/Mars-distance arithmetic.','map-crs':'Mars sphere CRS definition.','sector':'Hypothetical sector bounds, Hab and stops.','plan':'Input-only schema, checksum and plan serialization.','sols':'Eight excursions and cost-based path interpolation.','fog':'Simulated knowledge reveal and uncertainty penalty.','datasets':'NASA/USGS source metadata.','map':'Leaflet viewport factory.','sector-layers':'Leaflet grid/hazard/route/marker builders.','mission-store':'Authoritative mission inputs and derived results.','tablet-bridge':'Validated input-only tablet receiver / independent planner.','use-mission':'React subscription and playback interval cleanup.','app':'Original DOM-based mission orchestration.','tablet':'Original independent tablet DOM adapter.','exploration':'Original source/geology/surface-image DOM adapter.','mission-controls':'Original timeline/recon/handoff DOM adapter.','demo':'Handoff-only illustrative seed data; absent from production src/.','main':'React entry.','tablet-main':'Standalone React tablet entry.'}
    if name in names:return names[name]
    if p.suffix=='.jsx':return 'Supplied React '+name+' UI component; production adapters where under src/.'
    return 'Build/acquisition/browser verification tooling; '+name+'.'
inventory='\n'.join(f"| `{r['file']}` | {responsibility(r)} | {', '.join(r['exports']) or '—'} |" for r in facts['modules'])
doc_rows='\n'.join(f'| [{name}]({name}) | {descriptions[name][0]} | {descriptions[name][1]} |' for name in all_docs)
text=f'''# Baseline closure report — Tasks 0, 0D and 1

Recorded 14 November 2026. [STATUS.md](../STATUS.md) alone records task acceptance. This report separates executed checks from unverified external release/submission items.

## Facts established in this pass

- Actual HEAD: `{facts['head']}`. Prior code evidence at `0036eac`, plus later owner commits and the uncommitted React integration. No new commit, staging, tag, push or deployment was performed here.
- `git log -1`, `git status --short` and `git ls-files` were captured directly in [repository-facts.json](qa/baseline-closure/repository-facts.json). Existing working changes and historical records were preserved.
- Current suite: 39 tests, 39 passed, 0 failed: routing 8; mission 5; geography 9; plan 5; Sol 3; reconnaissance 3; mission-store/integrity 6. Historical counts of eight, 14, 22 and 33 are revision-specific evidence, not the present suite.
- Current CTX cache: 24 PNGs, 256 × 256 each, 1,356,690 bytes. Two level-10 tiles (rows 406–407, col 1464), six level-11 (rows 812–814, cols 2928–2929), sixteen level-12 (rows 1625–1628, cols 5856–5859). All byte counts and SHA-256 values match the original manifest.
- Reference assets: PDF 8,623,899 bytes; THEMIS JPEG 86,106 bytes; Perseverance JPEG 239,471 bytes. Their local hashes match the source register. No new production asset or dependency was added.
- Referenced historical commit objects checked: {len(facts['historicalCommitClaims'])}; unavailable IDs: {', '.join('`'+h+'`' for h in missing) or 'none'}. Object existence is verified; historical run/timing associations remain **[UNVERIFIED]** rather than retrospectively certified. No replacement commit or past run was invented. Actual CHANGELOG history is regenerated from `git log`, with original narrative preserved separately.
- Every current/legacy/handoff JavaScript, JSX, MJS and HTML application/test/tool file outside dependency/generated caches is inventoried with exports/imports/entry scripts below and in repository-facts.json. Current ownership is also documented in ARCHITECTURE.md.

## Task 0 — source matrix, extent, hygiene and visual comparison

The local WMTS capabilities document declares 13 matrix levels, 0–12, tile origin (-180, 90), 256 px tiles. Arithmetic was recomputed from the stored XML rather than copied from an old report:

| Level | Matrix width | Matrix height |
| --- | --- | --- |
{matrix}

Mars 2000 sphere R = 3,396,190 m; east-west pixel lengths below use 18.51° N:

| Level | Degrees/tile | Degrees/pixel | m/pixel north-south | m/pixel east-west |
| --- | --- | --- | --- | --- |
{geometry}

The old level-10 block (rows 403–406, cols 1463–1466) spans 77.16796875–77.87109375 E and 18.45703125–19.16015625 N. Against the documented USGS sheet extent (76.8–77.8 E, 17.7–18.7 N), overlap is 0.63203125° longitude × 0.24296875° latitude, **15.356384% of that degree-space extent**. This describes the historical cache, not the current 24-tile sector cache and not a ground-area or safe-EVA claim.

Fresh point-in-time probes at 21:37 UTC:

| Asset | Response | Bytes | Integrity |
| --- | --- | --- | --- |
| NASA Trek level 11 / row 814 / col 2929 | 200 image/png | 58,137 | PNG signature; SHA-256 equals retained manifest |
| NASA Trek level 12 / row 1628 / col 5858 | 200 image/png | 55,135 | PNG signature; SHA-256 equals retained manifest |
| Original USGS educational PDF URL | 200 application/pdf | 8,623,899 | SHA-256 identical to local PDF |

Exact URLs, hashes and timestamps are in [source-probes.json](qa/baseline-closure/source-probes.json). The PDF source is the original [USGS educational download](https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/Jezero%20Crater%20Color%20by%20Number%20-%20Final%20Version.pdf), linked to Sun and Stack (2020), [SIM 3464](https://doi.org/10.3133/sim3464). These checks do not certify future NASA/USGS service uptime. Responses were hashed in memory; production assets were not replaced.

### PDF comparison — performed, with corrected page identification

The exact local three-page PDF (SHA-256 `d4d52e2bde4ec36cfc3a64091c5c7c4bd49b3e3f84add6db942cfac299bf3646`) was rendered and all three pages inspected. **Page 2 is the unit key, not a map sketch.** The line-map drawings are on pages 1 and 3. Earlier Task 0 wording describing a page-2 sketch is inaccurate; it is retained as historical evidence under a correction banner, not repeated as a fresh observation.

- [Page 1](qa/baseline-closure/usgs-educational-page-1.png): map drawing and landing ellipse. The ellipse is a historical landing-site uncertainty area, **not the crater rim**. The left-side inlet, branching/lobate fan edge, internal circular feature and surrounding floor provide qualitative context.
- [Page 2](qa/baseline-closure/usgs-educational-page-2.png): NHjf1 and NHjf2 describe delta/fan units; Aeb describes wind-transported bedforms. Existing application paraphrases were checked against this key. These are interpreted regional geology descriptions, not assigned units at simulated stops.
- [Page 3](qa/baseline-closure/usgs-educational-page-3.png): enlarged numbered educational map, printed rotated on the portrait PDF page; it supports the same fan/inlet context as page 1.
- [CTX contact sheet](qa/baseline-closure/ctx-level11-contact.png): the already cached 36 level-11 inspection tiles (rows 811–816, cols 2926–2931), raw tile order with north at top. The west-entering channel terminates in a lobate, layered fan, with a circular feature inside and crater floor to its east. Its qualitative morphology agrees with the educational map context. **Visually confirmed by the agent:** the fan is visible and the currently registered sector includes part of it; the older north-shifted level-10 cache clips its southern part.
- [Current registered map](qa/baseline-closure/registered-map-1440.png): sector grid crosses the layered fan margin. Placement remains hypothetical; neither this comparison nor the source labels establish safe traversability or exact geological unit membership for any stop.
- [THEMIS PIA23386](../public/assets/jezero-themis.jpg): visually inspected for broader rim/floor/fan context. Its lower contrast, image rotation and absent verified footprint prevent a confident point-for-point alignment with CTX. It remains a separate reference JPEG. This is an explicit comparison limit, **not an unperformed comparison**. No image-brightness or visual matching was used for registration.

The only surface registration remains the existing documented WMTS matrix. No PDF, THEMIS or geology-to-grid transform, numerical elevation or slope was introduced. Documentation figures are renders/screenshots of genuine existing sources, not generated terrain; credits: NASA/JPL-Caltech/MSSS via Mars Trek for CTX, NASA/JPL-Caltech/Arizona State University for THEMIS, Sun and Stack/USGS for educational map. Figure lineage, originals and hashes are retained.

### Historical QA findings, individually reconciled

| Original finding/gap | Current tag | Fresh evidence / remaining limit |
| --- | --- | --- |
| H1: NASA resource absent | RESOLVED | 24 manifest-verified CTX images render on the registered map; source URL/hash probes and local JPEG/PDF provenance |
| H2: no browser/public acceptance | OPEN for public release; local browser portion RESOLVED | Current desktop/narrow/reduced-motion Edge and nested static build tests pass. No public URL, owner private-window acceptance or physical-device certification |
| M1: no-route UI untested | RESOLVED | Original/React browser harness blocked-grid/blocked-tablet tests show unavailable metrics and no active route; recovery tested |
| M2: misleading dust copy at identical endpoints | RESOLVED | Fresh focused browser check sets science position and dust; copy explicitly says identical endpoints need no detour |
| L1: stale Git handoff wording | RESOLVED for documentation | Current baseline and actual commit log recorded. Final freeze commit/tag and deployment remain separate release gates |
| L2: 32 × 44 px science marker | RESOLVED | All four marker buttons measure exactly 44 × 44 px at 1440 and 360 px; after pan at zoom 11/12/13 |
| Missing geographic EVA registration / metric distances | RESOLVED | Registered WMTS CRS, 4 km extent and pixel/marker/route measurements below; sector remains hypothetical |
| Cache likely misses delta / PDF comparison pending | RESOLVED | Current sector screenshot, contact sheet and actual PDF pages inspected; old cache overlap recomputed; page-number error corrected |
| Numeric DEM/slope / geological spatial identify | OPEN, explicitly gated | No qualifying numeric raster or registered geology geometry; no scientific costs fabricated |
| Raw rover frame ID / image at hypothetical stop | UNVERIFIED / intentionally not claimed | Published PIA24485 only; no raw-frame ID or stop/photo geolocation inferred |
| Worldview / Gale route resource use | RESOLVED as references only | No Earth data/API or real Gale traverse placed in Jezero; existing Sources retains the citation and limit |
| Historical eight/14/22/33 test counts / 16-tile cache / no-build / split viewport | RESOLVED as historical statements | Updated CURRENT/HISTORICAL document index, present 39 tests/24 tiles and React/static build evidence; historical numbers untouched |
| Original run timings / old missing commit IDs | UNVERIFIED | Unavailable objects listed above; no retroactive certification. Existing local HEAD/history read directly |
| Official guide, event eligibility, external offers, submission/video | UNVERIFIED owner release items | No portal/account, current offer audit or submission action; original policy/source records retained |

The eight requested historical audit/fix/test/changelog/build/integration/resource documents now carry current finding-by-finding annotations; original report bodies remain archival. Task reports, prior architecture/recovery reports and other-agent snapshots have explicit historical banners. No record or original source citation was deleted. Sources and current asset metadata were corrected, not replaced with generic links.

## Task 0D — exhaustive local links and documentation baseline

The reproducible [Markdown audit](qa/close-baseline-audit.py) checks root AGENTS/README/STATUS, **every Markdown document under docs/**, supplied handoff README and legacy README; generated copies and dependency caches are excluded. It checks local Markdown/image/reference targets and Markdown heading anchors, UTF-8 decoding, replacement characters and common mojibake patterns. Fenced examples are excluded from actual navigation checks. External URLs are inventoried separately; the requirement here is local link integrity, not a claim that every external URL or official policy was re-certified.

Three real broken links were repaired: asset register `../../assets/` now points to `../../public/assets/`; two historical architecture links now target actual current/future headings. Full final counts and every checked target are in [markdown-links.json](qa/baseline-closure/markdown-links.json). Fresh final scan reports zero missing paths, zero missing anchors and zero detected encoding issues. A complete classified document index appears in [docs/README.md](README.md); root README remains the current overview with separate gated-work and deployment/source limits. Architecture Part A is current and Part B is planned/gated.

Stale-claim scan terms: `eight tests`, `8 tests`, `no NASA asset`, `NASA resource absent`, `placeholder`, `four files`, `pathfinding.js together`, `H1`, `af9ac9e`, `not deployed`. Remaining old claims occur in annotated historical records or literal task specifications; the Globe placeholder and unverified public deployment remain accurate current limitations. The source register's former no-georeferenced-sector claim and asset register's former 16-level-10 inventory were corrected. The repeated older reconciliation blocks no longer call M1/M2/L2 unresolved.

Task 0D's documentary edits are separate from the small Task 1 acceptance repair below. The earlier static-only source layouts and counts are not relabeled as current React code. Exact baseline/import/export/HTML-entry inventory is preserved in JSON and the appendix.

## Task 1 — registered Leaflet acceptance revalidated

Existing source is retained; this was not a map rewrite. Eight pure domain engines remain unchanged. Inspection found that React MapPanel had kept latitude/longitude but omitted the original pointer **grid-cell readout** and explicit **sector bounds**. Those two presentation omissions were restored using `latLngToGrid()`/`SECTOR`, with no new projection, coordinate source, dependency or routing change. This is a Task 1 parity repair, not a documentation-only change hidden under Task 0D.

Focused real-browser checks: [close-map-checks.mjs](qa/close-map-checks.mjs), [raw results](qa/baseline-closure/registered-map-checks.json), Edge {checks['browser']} on Windows, headless. Both 1440 and 360 px initial views fit the entire sector. Markers and canvas route vertices were checked after pan at zooms 11, 12 and 13 with the original strict **≤1 px** requirement: worst marker error {max_marker:.6f} px; worst canvas route-vertex error {max_route:.6f} px. All native marker buttons are 44 × 44 CSS px and keyboard focusable.

| Viewport | Initial fitted zoom | N–S extent (m) | E–W extent (m) | Cell width at native level 12 (px) |
| --- | --- | --- | --- | --- |
{measurements}

Spike repeated in the actual React Leaflet instance: Leaflet 1.9.4; zoom-0 world 512 × 256 px, NW (0,0), SE (512,256); level-10 tile corner (374528,103168) and level-12 corner (1499648,416768) exact; one-degree Mars latitude distance within 1 m of 59,274.6975 m. Sector N–S and E–W lengths are each within 1 m of 4000, and native cell width exceeds 8 px.

Additional focused checks: pointer reports `grid cell 20, 20`; UI shows DERIVED bounds; hiding hazard shading leaves the hazardous route/cost unchanged; identical endpoints use correct dust narrative; tile-error handler shows a message without breaking actual routing. Existing full browser harnesses cover actual missing-tile requests, map/route controls, keyboard zoom/pan, no-route handling, fullscreen/view retention, and tablet/timeline/recon regressions. Source scans find no application map CSS-transform pan/zoom, `getBoundingClientRect` positioning, custom screen projection or manual marker pixel positioning outside Leaflet. Test scripts intentionally use Leaflet projection and DOM rectangles to measure alignment, not to position the map.

## Verification commands and outcomes

| Command | Result |
| --- | --- |
| `python docs/qa/close-baseline-audit.py numeric pdf probes` | Parsed 13 matrix levels; hashes/geometry verified; all three exact local PDF pages rendered; three source probes returned 200 |
| `python docs/qa/close-baseline-audit.py links` | All scoped local Markdown paths/anchors resolve; zero encoding issues; raw inventory retained |
| `node docs/qa/close-map-checks.mjs` | Desktop + 360 px projection/measurement/hygiene/readout/layer/tile-failure checks pass |
| `npm.cmd test` | 39 passed, 0 failed |
| `npm.cmd run test:browser` | 40 React development groups across desktop, tablet-width, mobile, reduced motion |
| `npm.cmd run test:legacy` | Original 81 checks × 3 configurations = 243 passed |
| `npm.cmd run build` | Static two-entry production build exits 0; source disclosures refreshed |
| `npm.cmd run test:production` | 36 groups across the same four configurations under nested `/ares-hud/` path |
| JS/MJS syntax + source/encoding scan | Current sources/tools pass; JSX compiled by Vite; pure engines and vendor/source assets retained |
| `git diff --check` | No new whitespace errors; intentional historical Markdown hard breaks remain |

Vite's existing external-vendored-script/CSS notices remain expected; production tests confirm those public Leaflet files load correctly. No public deployment, physical touch-device, screen-reader or cross-browser certification is claimed. PDF rendering used PyMuPDF 1.24.14 installed only in ignored `.browser-qa/pdf-tools/`; it is read-only local QA tooling, not a project/runtime dependency. Generated source comparison figures live only under docs/qa, not public/assets.

## Documentation inventory and reconciliation

| Document | Classification | Purpose / disposition |
| --- | --- | --- |
{doc_rows}

Root AGENTS/README/STATUS are the approved entry points. The unchanged supplied handoff README is explicitly UI-only; the legacy README is a recovery entry, not current implementation status. Supporting documentation remains in docs/.

## Module / HTML inventory (all non-generated application trees)

| File | Responsibility / entry scripts | Exports |
| --- | --- | --- |
{inventory}

Imports and complete machine-readable entries are in repository-facts.json. Source trees in legacy/UI and react-ui-handoff are historical/input scaffolds, not competing production state or maps.

## Files changed and remaining owner checks

Changed: current root README/STATUS; docs navigation, source/asset registers, historical banners/finding annotations, actual Git changelog and two broken historical architecture anchors; this report and supporting QA tools/results/figures. Task 1 alone changes MapPanel's missing cell/bounds text. Application routing, pure math, PDF/JPEG/PNG files, vendor licenses, owner approval rules and release schedule were not changed. Existing unrelated working changes remain intact.

Not verified: public-host deployment/private-window approval, physical phone/touch/assistive technology, event portal eligibility/rules/offers, submission or freeze tag. No commit was created merely to replace a missing report ID; the existing verified code commit and exact working-tree evidence are sufficient to record local task acceptance separately from those release gates. No video, push or submission was made.
'''
write('docs/BASELINE_CLOSURE_REPORT.md',text)

status=(ROOT/'STATUS.md').read_text(encoding='utf-8')
status=status.replace('| 0 Preflight | IN PROGRESS | Fresh numerical/network checks pass; visual CTX fan confirmed, PDF comparison not repeated |',f'| 0 Preflight | DONE | Rechecked 14 Nov against `{head}` + working tree: 13 matrices, fresh 200 PNG/PDF probes, hashes, old/current extent, all PDF pages and CTX comparison; [closure evidence](docs/BASELINE_CLOSURE_REPORT.md) |')
status=status.replace('| 0D Documentation baseline | IN PROGRESS | Missing entry points restored; historical reports retained; exhaustive link reconciliation outstanding |','| 0D Documentation baseline | DONE | Every scoped Markdown path/anchor audited; historical findings tagged individually, actual Git history and module inventory captured; corrected 3 broken links and stale asset inventory; [closure evidence](docs/BASELINE_CLOSURE_REPORT.md) |')
status=status.replace('| 1 Registered Leaflet map | IN PROGRESS | Code exists in `0036eac`; desktop/mobile revalidation in docs/AUDIT_CURRENT.md; no new commit |',f'| 1 Registered Leaflet map | DONE | Existing `0036eac` map retained in React; strict ≤1 px marker/route alignment at 3 zooms, 4 km extent, native-cell width, 44 px controls, failure/layer/readout checks at 1440/360; uncommitted parity text repair; [closure evidence](docs/BASELINE_CLOSURE_REPORT.md) |')
status=status.replace('- OPEN: full Task 0D historical/link reconciliation and PDF comparison are not certified complete.','- RESOLVED: full Task 0D historical/local-link reconciliation and PDF comparison rechecked 14 November 2026. All scoped local links/anchors resolve and historical findings have current evidence tags. All 3 USGS PDF pages were rendered: page 2 is the key, maps are on pages 1/3; CTX comparison is qualitative, with no PDF/THEMIS transform inferred. See [closure report](docs/BASELINE_CLOSURE_REPORT.md).')
status=status.replace('Release/submission gates and historical documentation reconciliation below remain separate from this migration.','Release/submission gates below remain separate; historical documentation reconciliation is now recorded in the baseline closure report.')
status=status.replace('| USGS geology and rover context | REPORTED | Existing local PDF/JPEG and source register; not georegistered together |','| USGS geology and rover context | VERIFIED (reference only) | All 3 local PDF pages rendered, page-2 key checked, source PDF hash matches fresh 200 response; qualitative CTX comparison; no PDF/JPEG georegistration |')
notice=f'''## Baseline closure — 14 November 2026 (latest acceptance)

Tasks **0 Preflight**, **0D Documentation baseline** and **1 Registered Leaflet map** are **DONE** with fresh evidence in [BASELINE_CLOSURE_REPORT.md](docs/BASELINE_CLOSURE_REPORT.md). Current Git HEAD is `{head}` plus the existing uncommitted React integration; no new staging, commit, tag or deployment was performed. Earlier missing-PDF/link-reconciliation notes and lack of a new commit no longer leave these local verification tasks open.

PDF correction: page 2 is the unit key; map drawings are on pages 1 and 3. Local/source PDF hashes match. The qualitative visual comparison was performed without assigning geology units or inferring a registration transform for the PDF/THEMIS reference.

Current evidence: 39 Node tests; 243 original browser assertions; 40 React development / 36 static-production browser groups; focused desktop/mobile map checks at zoom 11/12/13 meeting ≤1 px alignment. The full local Markdown path/heading audit and document inventory are recorded alongside source probes, geometry/hashes, PDF renders and CTX comparison figures in `docs/qa/baseline-closure/`. Official event, public-host and physical-device checks remain separately unverified.

'''
if '## Baseline closure —' in status:
    status=re.sub(r'## Baseline closure —[\s\S]*?(?=## React UI migration)',notice,status,count=1)
else:
    status=status.replace('# ARES-HUD status\n','# ARES-HUD status\n\n'+notice,1)
write('STATUS.md',status)
readme=(ROOT/'README.md').read_text(encoding='utf-8')
if '## Planned / gated work' not in readme:
    readme=readme.replace('## Repository and recovery','## Planned / gated work\n\nGlobe remains a placeholder; numerical elevation/slope, QR and synchronization retain their separate gates. Public deployment, physical touch devices and assistive technology remain unverified. Preflight, historical/local-link reconciliation, qualitative CTX/PDF comparison and registered-map revalidation evidence is in the [baseline closure report](docs/BASELINE_CLOSURE_REPORT.md); task acceptance is recorded only in STATUS.md.\n\n## Repository and recovery',1)
match=re.search(r'## Planned / gated work\n[\s\S]*?(?=## Repository and recovery)',readme)
if match:
    planned=match.group(0);readme=readme[:match.start()]+readme[match.end():]
    readme=readme.replace('## Run and test',planned+'## Run and test',1)
write('README.md',readme)
for name in ['react-dev-report.json','react-production-report.json','legacy-migration-report.json']:
    original=ROOT/'.browser-qa'/name
    data=json.loads(original.read_text(encoding='utf-8'))
    assert not data.get('failures'),name
    if 'results' in data:assert all(r['result']=='PASS 81' for r in data['results'])
    else:assert len(data['runs'])==4 and all(not r['errors'] and not r['badRequests'] for r in data['runs'])
    shutil.copy2(original,OUT/name)
print('Baseline closure report, exhaustive classified navigation and Task 0/0D/1 status updated.')
