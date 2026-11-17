> AUTHORITATIVE SOURCE REGISTER - local integrity rechecked 15 November 2026 for the final release audit. Exact NASA/USGS URLs, credits and acquisition notes below remain dated records, not newly fetched remote sources. Historical deployed assets/ and vendor/ paths map to repository public/, except root vendor/three/ renderer inputs. [STATUS.md](../STATUS.md) records acceptance.

## Current integrity check

All 24 cached CTX tiles match manifest byte counts and SHA-256 values: **1,356,690 bytes (1,324.9 KiB)**. Levels 10-12: two level-10 tiles (rows 406-407, column 1464), six level-11 tiles (rows 812-814, columns 2928-2929) and sixteen level-12 tiles (rows 1625-1628, columns 5856-5859), every one a 256 x 256 PNG. Cached files are `assets/trek/{level}/{row}-{col}.png`, matching the Leaflet template `assets/trek/{z}/{y}-{x}.png`. `assets/trek/manifest.json` records level, row, col, URL, bytes and SHA-256 per tile; `node scripts/fetch-tiles.mjs` regenerates the cache and manifest idempotently. The 16 earlier level-10 tiles at rows 403-406, columns 1463-1466 were deleted in Task 1: they lie north of the simulated sector and are no longer served.

| Local file | Bytes checked | SHA-256 checked |
| --- | --- | --- |
| assets/jezero-themis.jpg | 86106 | 9d5c31ef7f77d2543d8bacbeae713d7afbf71211f29953404eaf9aa5ff9a9998 |
| assets/perseverance-delta.jpg | 239471 | be26297f637ed2bcb06d2f2a70cf1baa6e383ea94d1cf82dbff51a4e64d79696 |
| assets/jezero-geology.pdf | 8623899 | d4d52e2bde4ec36cfc3a64091c5c7c4bd49b3e3f84add6db942cfac299bf3646 |

| Tile path | Bytes | SHA-256 | Exact source |
| --- | --- | --- | --- |
| assets/trek/10/406-1464.png | 63600 | 6dbd5d2f00f0676f8f821c3830cf2b8c321a68b16e4ef2b96050103feaf90895 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/10/406/1464.png) |
| assets/trek/10/407-1464.png | 60276 | 82491f0b929a2df137fe1faab5911b8b0074765cef406eace9d167266f12b0ee | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/10/407/1464.png) |
| assets/trek/11/812-2928.png | 63018 | 94bcebfcd2f64cbaeb4dc3af6fc0f1c04eb0acdc4aa51106a75c0e71c9954478 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/11/812/2928.png) |
| assets/trek/11/812-2929.png | 63018 | 341bca64cf42981a15cc71f9a48ea94cff443fd1f3f24230d92b0ee53dd8fac6 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/11/812/2929.png) |
| assets/trek/11/813-2928.png | 60176 | a24124de716a4681f5c0a3e12fec5ce47686eb1e9be502012f1cf0d7852d0316 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/11/813/2928.png) |
| assets/trek/11/813-2929.png | 56893 | 7e0ad5c3a2b34b432a325848dd1728cbb9de22050258ffe823419cee06a21311 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/11/813/2929.png) |
| assets/trek/11/814-2928.png | 57508 | 2ca588f62568cc4fdd20c15c3ef26e50742b75dccf820bd88333b4df77dd329e | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/11/814/2928.png) |
| assets/trek/11/814-2929.png | 58137 | 38bd3135c2ddc9b0e79b0a4217c3609b55fb7e18cb6b68f4c5bc083592e6295a | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/11/814/2929.png) |
| assets/trek/12/1625-5856.png | 54556 | 480c4b74507af0b796f10a6cedf10439820e7d779bcb97e3aa6ebfcb71eb96f7 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1625/5856.png) |
| assets/trek/12/1625-5857.png | 58040 | 61ee56770dbdcf5314e926baa17985b5447a8446adb04d14c27f9b49eff35df6 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1625/5857.png) |
| assets/trek/12/1625-5858.png | 56701 | a032b6aaf8fe107cba516eba96dd207d0d5523c3cf548bbb672e91c16bc7b819 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1625/5858.png) |
| assets/trek/12/1625-5859.png | 57340 | 9ad4af0233fef44f07fdabdc3d0586e538d30c82645decb31bc708224e9558aa | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1625/5859.png) |
| assets/trek/12/1626-5856.png | 54442 | c3a2406434289bb698c899120f4689f3e59ef453f647192ccb980ee5a17859ff | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1626/5856.png) |
| assets/trek/12/1626-5857.png | 53780 | 82ab84688ea059df0837631526576519d58e4c3fbf633c6d6dcd71294fe8f579 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1626/5857.png) |
| assets/trek/12/1626-5858.png | 53378 | 053822d023f3ba2a45d307f744ba5f285ca17897fcb161cdbf5b1534f00b3859 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1626/5858.png) |
| assets/trek/12/1626-5859.png | 57430 | 92ea9b17d4097a4e029b57d63e8fd02cb0c30ae8ab563f600277497d4b7a7cb7 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1626/5859.png) |
| assets/trek/12/1627-5856.png | 54284 | 8c8a3916870c668f2c792c06edb8e91d3633cc7788f962329c2d3ebbefb546aa | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1627/5856.png) |
| assets/trek/12/1627-5857.png | 53732 | 33392b61ae9ee1fd7cacf06efe6e1ca3188a24faa24d91487c2dd6d82a7a55dc | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1627/5857.png) |
| assets/trek/12/1627-5858.png | 49399 | 2bf771f5af6a6af560f9940cef1e372004020cf71ec6ebfe70d49c543df98a7f | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1627/5858.png) |
| assets/trek/12/1627-5859.png | 52760 | df21b0dbb1e0fc5b5dfee23c6732a97a3f9c32569b21271925216473c9459baa | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1627/5859.png) |
| assets/trek/12/1628-5856.png | 55982 | a1b8cab872bbb471e917fb191be347032a5c1d66338f4b486182409fb982b0a8 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1628/5856.png) |
| assets/trek/12/1628-5857.png | 52243 | 60141a07442794af224b3e77b847a524e7294ee77ff14812f0503aec14ebb221 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1628/5857.png) |
| assets/trek/12/1628-5858.png | 55135 | 5c2040a462feb6d96b40d381e94769d9d3c4c5c5bf12d0d9a6d228f0689bb596 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1628/5858.png) |
| assets/trek/12/1628-5859.png | 54862 | cedcb5b6530dafc1fdb876e99d70a6c1dd4e950e03c7840e9ef8a100b4138273 | [source](https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/12/1628/5859.png) |

## Vendored library: Leaflet 1.9.4

| Local file | Bytes | SHA-256 |
| --- | --- | --- |
| vendor/leaflet/leaflet.js | 147552 | db49d009c841f5ca34a888c96511ae936fd9f5533e90d8b2c4d57596f4e5641a |
| vendor/leaflet/leaflet.css | 14806 | a7837102824184820dfa198d1ebcd109ff6d0ff9a2672a074b9a1b4d147d04c6 |
| vendor/leaflet/images/layers.png | 696 | 1dbbe9d028e292f36fcba8f8b3a28d5e8932754fc2215b9ac69e4cdecf5107c6 |
| vendor/leaflet/images/layers-2x.png | 1259 | 066daca850d8ffbef007af00b06eac0015728dee279c51f3cb6c716df7c42edf |
| vendor/leaflet/images/marker-icon.png | 1466 | 574c3a5cca85f4114085b6841596d62f00d7c892c7b03f28cbfa301deb1dc437 |
| vendor/leaflet/images/marker-icon-2x.png | 2464 | 00179c4c1ee830d3a108412ae0d294f55776cfeb085c60129a39aa6fc4ae2528 |
| vendor/leaflet/images/marker-shadow.png | 618 | 264f5c640339f042dd729062cfc04c17f8ea0f29882b538e3848ed8f10edb4da |
| vendor/leaflet/LICENSE | 1395 | 53e8dc25862014e4324741ca18fbe3611e11d42ef69f59f86ea8c5389647d4cb |

Source: `https://unpkg.com/leaflet@1.9.4/dist/` (the npm package `leaflet@1.9.4`), retrieved 14 November 2026 with `node scripts/vendor-leaflet.mjs`. Licence BSD-2-Clause, Copyright (c) 2010-2023 Volodymyr Agafonkin and (c) 2010-2011 CloudMade; the full text is `vendor/leaflet/LICENSE`. No plugin, no runtime CDN request, no 2.x or alpha build is used. The vendored file reports `L.version === "1.9.4"` in browser-test.html, and its `CRS.distance` uses the CRS `R` property, which `map-crs.js` sets to the Mars 2000 sphere radius 3,396,190 m.

Source credit: NASA/JPL-Caltech/MSSS via Mars Trek for CTX; NASA/JPL-Caltech/Arizona State University for THEMIS; NASA/JPL-Caltech/ASU/MSSS for PIA24485; Sun & Stack (2020), USGS SIM 3464 for the educational geological reference. Source records and snapshots are local evidence; no new online licensing audit was performed.

OBSERVED: NASA orbital/surface images. DERIVED: tile-matrix coordinates, Leaflet screen projection and map distances through the MarsEQ CRS. INTERPRETED: USGS unit explanations and published delta interpretation. SIMULATED: sector bounds, Hab, stops, grid scale, costs, hazards and routes. The hypothetical grid is WMTS-registered. No numerical DEM, slope or physical safety measurement is present; registration does not validate sector placement or traversability.

## Preserved source and acquisition records

# NASA data sources

Verified and downloaded from official NASA publication links on 2026-11-14. These are published image products, not georeferenced numerical rasters.

## PIA23386 - Jezero Crater Delta

- Source: https://science.nasa.gov/photojournal/jezero-crater-delta/
- Exact downloaded asset: https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia23/pia23386/PIA23386.jpg
- Local file: assets/jezero-themis.jpg
- Mission/instrument: Mars Odyssey / THEMIS VIS
- Credit: NASA/JPL-Caltech/Arizona State University
- Date: Captured 2019-07-02 11:53; published 2019-08-12. Orbit 77838.
- Coverage: Jezero crater delta region; exact footprint not verified.
- Projection, pixel scale and spatial units: not established for this published JPEG. No world-coordinate transform used.
- SHA-256: 9d5c31ef7f77d2543d8bacbeae713d7afbf71211f29953404eaf9aa5ff9a9998
- Downloaded bytes: 86106

## PIA24485 - Perseverance View of the Delta in Jezero Crater

- Source: https://science.nasa.gov/resource/perseverance-view-of-the-delta-in-jezero-crater/
- Exact downloaded asset: https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/4/5/45791_PIA24485_K4_ZCAM_main_sol004_Delta_Remnant_unannotated.jpg
- Local file: assets/perseverance-delta.jpg
- Mission/instrument: Mars 2020 Perseverance / Mastcam-Z
- Credit: NASA/JPL-Caltech/ASU/MSSS
- Date: Acquired 2021-02-22; published 2021-03-05. Download filename includes sol004; no raw frame identifier verified.
- Coverage: Jezero crater delta region; exact footprint not verified.
- Projection, pixel scale and spatial units: not established for this published JPEG. No world-coordinate transform used.
- SHA-256: be26297f637ed2bcb06d2f2a70cf1baa6e383ea94d1cf82dbff51a4e64d79696
- Downloaded bytes: 239471

## Use and limitations

Phase 2 moves THEMIS into a separate reference image with object-fit: contain; it is no longer behind the grid. The square grid remains unregistered and conceptual; its 4 km extent is NOT the image footprint. Hab/science coordinates are hypothetical grid indices. The surface image is an expandable science-context inspector, not matched to a waypoint. Its published colors approximate natural appearance. Neither image supplies route penalties.

OBSERVED: published orbital/surface imagery. INTERPRETED: NASA's delta sediment interpretation, paraphrased in the inspector. DERIVED: tile-pointer angular coordinates from the WMTS matrix only; no registered EVA coordinates or slope. SIMULATED: extent, Hab, waypoint, costs, dust and navigation outputs. No live data or flight-safety claim.

THEMIS citation policy: https://themis.asu.edu/terms (educational credit above). NASA source credits remain separate from repository MIT software licensing; no NASA endorsement is implied. Preserve credits when redistributing. No external code libraries added; implementation assisted by OpenAI Codex.

## Phase 1 investigation history (superseded by Phase 2 below)

- https://trek.nasa.gov/mars/ : interactive portal yielded no usable layer catalog in available text tools. https://trek.nasa.gov/mars/jpl/config/textAbout.html documents downloads, metadata and slope/elevation tools, but no specific Jezero export or supported API was verified. Photojournal is an explicit fallback, not a claimed Trek export.
- https://astrogeology-usgs.hub.arcgis.com/pages/interactive-maps-mars : interactive page yielded no readable layer data; no geological overlay acquired or units inferred.
- https://science.nasa.gov/resource/curiositys-proposed-path-up-mount-sharp/ : inspected as route-storytelling reference only; no Gale route or image placed on Jezero.
- https://worldview.earthdata.nasa.gov/ : reviewed as requested; excluded as Earth-focused, not Mars evidence.
- https://mars.nasa.gov/mars2020/multimedia/raw-images/ : gallery requires JavaScript. Used the linked mission's official NASA published Mastcam-Z product instead; not claimed to be a raw gallery download.

## Phase 1 manual acquisition notes (Trek local tiles are now integrated; original rasters remain outstanding)

Open Mars Trek in a JavaScript browser, search Jezero, select an orbital imagery layer and inspect its metadata. Use the layer's offered download link (the exact layer/export control could not be verified here). Save the original raster plus metadata to assets/jezero-source/. Record layer ID, bounding box, projection, pixel scale and credit. For elevation obtain the matching georeferenced elevation raster, horizontal and vertical units, datum and nodata value. Do not use a screenshot to derive slope. Supply these files for transform/alignment verification before changing routing costs. No particular layer availability is promised.

For the present images, manual re-download is unnecessary. If lost, open each source above, choose its JPEG/Original download, and save to the exact local filename above.

## Historical Phase 2 acquisition: Mars Trek WMTS integration

> Historical 16-tile acquisition record. Current 24-tile levels 10–12 inventory and hashes are above; old extent and cached-level statements below describe that earlier acquisition.

Integrated layer: **Jezero_CTX_BlockAdj_dd**, catalog title **MRO CTX, Jezero Mosaic, Preliminary**. Mission/instrument: Mars Reconnaissance Orbiter / Context Camera. Attribution: NASA/JPL-Caltech/MSSS, delivered through NASA/JPL Mars Trek. This is now actual Trek consumption, distinct from PIA23386.

- Documentation: https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars
- Capabilities: https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/WMTSCapabilities.xml
- Catalog/service discovery used the endpoints in the official documentation's config/config.json, not guessed layer identifiers.
- Catalog snapshot: assets/trek-source.json; capabilities: assets/trek-capabilities.xml.
- Tile template: https://trek.nasa.gov/tiles/Mars/EQ/Jezero_CTX_BlockAdj_dd/1.0.0/default/default028mm/10/{row}/{col}.png
- Downloaded rows 403-406, columns 1463-1466, 16 unchanged 256px PNGs. Exact URLs, paths, sizes and SHA-256 are in assets/trek/manifest.json (about 1 MB total).
- WMTS CRS identifier: urn:ogc:def:crs:EPSG::104905, Mars geographic tiling (not terrestrial WGS84). Matrix 10: 2048 columns x 1024 rows; origin -180,90; 180/1024 degrees per tile. Pixel angular interval 0.0006866455078125 degrees. The catalog native mosaic interval is 0.0001 degree; displayed tiles are downsampled.
- Full source bbox: 75.1537692,15.9058484,78.8717121,19.4453003. Cached bbox is computed from the matrix, not asserted to be an EVA footprint. Catalog creation timestamp 2020-08-03 is not image acquisition time. Exact acquisition dates remain unknown.
- Task 0 check (14 November 2026): the declared matrix runs from level 0 to level 12 (level 12: 8192 x 4096 tiles). One live request each at level 11 (row 814, column 2929) and level 12 (row 1628, column 5858) returned HTTP 200 `image/png` from the same template, so the higher levels were served at test time. Point-in-time check only: no higher-level tile is cached in the repository and no continued availability is promised. Cached level-10 block: 77.16796875-77.87109375 E, 18.45703125-19.16015625 N.
- Delta coverage: the cached block overlaps the USGS SIM 3464 sheet by 0.632 degree of longitude and 0.243 degree of latitude (about 15.4 % of its stated area) and clips the southern edge of the delta visible in level-11 imagery. No registration, distance or measurement is implied by this overlap; see the Task 0 report.
- Pan, zoom, opacity, visibility and coordinate inspection operate on cached tiles. No geographic-to-EVA transform, metric distance, DEM or slope is implemented. No brightness-derived science.
- Downloads succeeded without authentication/API key. Runtime uses same-origin local files; remote CORS is therefore unnecessary and was not tested. No remote service availability is required for routing. Broader reuse terms were not independently audited; retain source credit, avoid endorsement claims.

## Phase 2: USGS geological reference

Actual local asset: assets/jezero-geology.pdf, official USGS educational color-by-number adaptation of Sun, V.Z., and Stack, K.M. (2020), Geologic map of Jezero crater and the Nili Planum region, Mars, SIM 3464, https://doi.org/10.3133/sim3464.

Exact download: https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/Jezero%20Crater%20Color%20by%20Number%20-%20Final%20Version.pdf

This is the 3-page educational map with unit explanations, NOT the full professional map/GIS dataset. Local PDF is 8.6 MB. Inspectable units NHjf1, NHjf2 and Aeb are paraphrased from its page 2; identifiers preserve that educational source's capitalization. Interpretations are historical publication context, not a current mission geologic revision or safety assessment.

Related verified service metadata: https://tiles.arcgis.com/tiles/v01gqwM5QqNysAAi/arcgis/rest/services/JezeroFiguresAnno_WebTile/MapServer?f=pjson, saved as assets/geology-service.json. It documents 76.8-77.8 E, 17.7-18.7 N coverage and Mars spherical Transverse Mercator with central meridian 77.5 E, radius 3396190 m. Original map scale 1:75,000. Its figures/annotation service is researched but NOT rendered or used as geometry. No claim that this CRS supplies a transform for the educational PDF. Displayed separately, never overlaid on Trek or simulated costs. Original professional PDF fetch returned HTTP 403. Public educational download succeeded without credentials; local rendering avoids CORS. USGS source listing marks the publication public domain; retain Sun & Stack credit.

## Phase 2: inspirations, observations and exclusions

The exact requested portals were revisited. Worldview remains workflow inspiration only (layer discovery, opacity and source cards); no Earth imagery/API used. Curiosity's Mount Sharp page supplies the annotated traverse concept only; no Gale geometry is imported. Existing PIA24485 remains the sole rover observation: verified published product, not a raw-gallery frame. Raw gallery renders a JavaScript shell through available research tools; no extra images or unverified metadata were added. No surface image is matched to the hypothetical stops.

Three.js r160 is now vendored for the illustrative globe; no new imagery or scientific datasets were introduced. New code and documentation assisted by OpenAI Codex. NASA/USGS assets have their own credits, separate from MIT application code.

## v0.3 Mars Trek WMTS API reference - no globe asset acquired

Documentation reference checked during this documentation update: [official Mars Trek WMTS documentation](https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars). It describes OGC RESTful WMTS and this illustrative template, not a verified endpoint for a global Mars layer:

```text
https://{WMTS endpoint}/1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png
```

Some layers use JPG. Parse each actual layer's GetCapabilities XML for ResourceURL/extension, endpoint, layer ID, style, TileMatrixSet, SupportedCRS, levels/limits, coverage, origin and tile geometry. Missing tiles can indicate no coverage. The existing Jezero CTX cache is regional; it does not prove global coverage or compatibility with a globe. Mars Trek supplies imagery services, not the globe renderer, navigation engine, mission simulator or route algorithm.

No global data layer, downloadable globe texture, rover coordinate dataset or globe credit is verified/acquired by this update. The illustrative Three.js renderer is now vendored for the reduced-scope globe; candidate availability, reuse/conversion permission, projection/UV orientation, seams/poles, size, browser CORS when applicable and offline behavior remain Task 7 spike work. Existing local cache hashes above are unchanged. Browser CORS is not inferred from server-side downloads or documentation access.

| Reference URL supplied by owner | Role / verification still required |
| --- | --- |
| https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars | Documentation checked; discover a genuine GLOBAL Mars layer and read its capabilities before acquisition. No global endpoint asserted here. |
| https://api.nasa.gov/ | API catalogue/key-registration reference; text fetch returned a signup shell. Not a universal planetary globe endpoint; no key requirement for Trek inferred. |
| https://eyes.nasa.gov/apps/earth/#/ | Experience reference only, not a Mars API, embedded application or permission to copy UI. |
| https://astrogeology-usgs.hub.arcgis.com/pages/interactive-maps-mars | Optional geological context; verify each service/permission. Not a safety/traversability source. |
| https://science.nasa.gov/resource/curiositys-proposed-path-up-mount-sharp/ | Gale contextual route reference only; not verified machine-readable coordinates and never Jezero geometry. |
| https://mars.nasa.gov/mars2020/multimedia/raw-images/ | Image/metadata/credit reference; not proof of a rover coordinate feed or current position. |
| https://worldview.earthdata.nasa.gov/ | Earth-focused workflow reference, not a Mars basemap. |

### Rover-marker source verification queue

Curiosity and Perseverance require authoritative NASA mission/publication or planetary-data coordinate records. Exact coordinate-product URLs are **not established** in this audit; find and verify them during Task 7, rather than invent links. Record mission identity, landing-site versus dated rover position, epoch, latitude/longitude convention, coordinate frame, source page/product, credit/usage terms and retrieval date. Record exact original URLs and local bytes/hashes only if a real asset is acquired. Historical traverse geometry requires its own source and epoch; omit unknown current positions/tracks. The reference portals above are discovery inputs, not coordinate evidence.

Classification: source imagery OBSERVED; verified coordinate/texture conversions DERIVED with method/lineage; published geology INTERPRETED; the ARES sector and astronaut plans/hazards/costs/Sols/reconnaissance SIMULATED. Labels must not turn hypothetical sector placements into real rover mission locations. No new scientific measurements are claimed.

## 14 November feature work and disposable spike

Tablet, Sol and reconnaissance work reused the existing 24 local CTX tiles; all hashes and bytes were rechecked, with zero mismatches. No production NASA/USGS asset or dependency was added or changed. Reconnaissance, Sols and additional route penalties are SIMULATED, never new NASA data.

A separate ignored `.browser-qa/globe-spike/` experiment downloaded two global MGS MOC PNG tiles; those tiles remain QA-only and are not production assets. The MIT Three.js r160 module/licence from that spike is reused by the production globe and is documented in [THIRD_PARTY.md](THIRD_PARTY.md). Numeric elevation acquisition stopped on HTTP 403; no DEM metadata or derived slope is claimed.


## React migration path mapping — 14 November 2026

Original source URLs, retrieval dates, bytes and hashes above are preserved. Deployed `assets/...` files now reside at repository `public/assets/...`; `vendor/...` now resides at `public/vendor/...`. The recoverable legacy app retains its original copies. Manifests deliberately retain deployed `assets/...` paths. No new NASA/USGS asset was downloaded. All 24 CTX byte counts and SHA-256 values match; the acquisition script rehashed the cache with zero downloads. The current Leaflet map uses registered WMTS coordinates; historical statements about no registered sector describe earlier revisions. Registered hypothetical placement does not establish scientific safety or real EVA locations.

Source notes and third-party disclosures are copied into the production build; React/React DOM/Scheduler MIT and Lucide ISC licenses are included under `licenses/`. See THIRD_PARTY.md for pins and purposes.


## Baseline closure source recheck — 14 November 2026

Fresh source probes at 21:37 UTC returned 200 `image/png` for level 11 row 814 column 2929 (58,137 bytes) and level 12 row 1628 column 5858 (55,135 bytes); both SHA-256 values equal the retained manifest. The original USGS educational PDF download also returned 200 `application/pdf`, 8,623,899 bytes, SHA-256 `d4d52e2bde4ec36cfc3a64091c5c7c4bd49b3e3f84add6db942cfac299bf3646`, identical to the local file. Point-in-time probes do not guarantee future service availability. Responses were hashed in memory; no new runtime dataset was installed.

All three local PDF pages were rendered and compared with the existing CTX contact tiles, current registered sector and THEMIS JPEG. Page 2 contains the unit key (NHjf1, NHjf2, Aeb), not a map sketch; drawings are on pages 1 and 3. Older claims of a page-2 sketch are corrected by the baseline closure report. Comparison confirms qualitative inlet/fan morphology only; no georeferencing transform for the educational PDF or THEMIS JPEG was derived, and no geological unit is assigned to a hypothetical waypoint.

Evidence and source-linked figure lineage: [BASELINE_CLOSURE_REPORT.md](HISTORY.md#baseline-closure-report), [source probe JSON](qa/baseline-closure/source-probes.json), [local integrity/geometry](qa/baseline-closure/geography-integrity.json). PDF renders and raw contact-sheet screenshots are documentation evidence under `docs/qa/`, excluded from production assets.

## Current illustrative Globe source distinction - 15 November 2026

Current PlanetaryGlobe.jsx generates original deterministic 512 x 256 Canvas artwork, classified SIMULATED and covered by the project MIT license. No global NASA mosaic is used in this production view; no new observations, source georegistration or rover positions are represented. Regional NASA CTX imagery continues in Surface Mode.

Three.js r160 is production rendering software, not planetary data. Exact original source URLs, byte counts and SHA-256 values are in [vendor manifest](../vendor/three/manifest.json); source/license integrity was rechecked against that manifest in the final document review. [THIRD_PARTY.md](THIRD_PARTY.md) records MIT licensing and purpose. QA-only global mosaic investigations remain historical acquisition evidence, not a deployed NASA globe layer.

## Final release audit - 15 November 2026

Concurrent UI-asset update: `public/assets/icon/ARES-HUD-icon.svg` was added and referenced by both root HTML entries while this audit was running. Local file: **2,541,393 bytes**, SHA-256 **`9ab12202de87839d23464324185d42f0980351be11226fdff725d521b81dc61d`**. Deployed path is `assets/icon/ARES-HUD-icon.svg`. The SVG contains embedded raster artwork. On 15 November 2026 the owner confirmed: "This is a generated image for the website icon." Record it as owner-supplied generated UI artwork (SIMULATED), not NASA imagery. The generating tool, original generation record and specific reuse/license terms were not provided; do not infer an asset license from the application's MIT license. These concurrent changes were preserved rather than authored by the documentation agent.

All 24 records in public/assets/trek/manifest.json were matched to actual files and this register's table: deployed file paths, source URLs, byte counts and SHA-256 values agree. Every PNG is 256 x 256; total cache size is 1,356,690 bytes (2/6/16 tiles at levels 10/11/12). THEMIS/Perseverance JPEGs and the USGS PDF also match their preserved hashes. No source asset or original provenance record was replaced.

This is a local integrity check, not a new fetch of historical NASA/USGS URLs or a fresh permissions/metadata review. The final build audit separately checks that source disclosures, cache files and runtime licenses survive into dist/. See [final audit evidence](qa/final-release/audit.json).

Repository public/assets/... becomes deployed assets/..., and source docs/... is copied to deployed docs/.... Leaflet ships under vendor/leaflet/; root vendor/three/ is bundled code with a separate licenses/three/LICENSE copy. Rendering software is not observed planetary data.

OBSERVED: genuine CTX and published NASA reference imagery. DERIVED: WMTS registration arithmetic, coordinates, route lengths and bearings under the documented Mars sphere. INTERPRETED: sourced geological unit/regional delta explanations. SIMULATED: hypothetical sector/astronaut stops, costs, dust, Sol progress, reconnaissance and procedural Globe artwork. No numeric elevation, derived slope, registered geology geometry or operational safety inference is present. Registration does not establish safe placement or navigability.
