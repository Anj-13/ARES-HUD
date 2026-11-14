from pathlib import Path
import shutil
root=Path(__file__).resolve().parent.parent
def edit(name,fn):
    p=root/name
    p.write_text(fn(p.read_text(encoding='utf-8')),encoding='utf-8')
edit('src/components/MissionPanel.jsx',lambda s:s.replace('selectedId,status}', 'selectedId,status,result,targets}').replace("onSelect('delta')", "onSelect('delta-front')").replace('<p className="status-line"', '<ol className="route-sequence">{targets.map((p,i)=><li key={p.id || i}>{p.name || \'Hab\'} · {result?result.segments[i]?.cost.toFixed(2)+\' simulated cost\':\'No complete route\'}</li>)}</ol><p className="status-line"').replace('<span>{i+1}', '<span>{i+1}').replace('<div className="stop-sub">','<p className="tiny muted">{s.objective}</p><div className="stop-sub">'))
edit('src/components/TelemetryPanel.jsx',lambda s:s.replace('onReset,metrics}', 'onReset,metrics,status,scenario}').replace("onClick={onHazard}","aria-pressed={hazard} onClick={onHazard}").replace('Route to science waypoint</h4>','{status}</h4>').replace("{hazard?'Fixed region blocked in preview; connect the existing rerouting engine.':'Select “Simulate dust hazard” to block a fixed region and recalculate.'}",'{scenario}'))
edit('src/domain/datasets.js',lambda s:s.replace('cached level 10: 0.0006866455078125 degree/pixel','cached levels 10–12; level 12: 0.000171661376953125 degree/pixel').replace('no route registration or elevation.','WMTS-registered coordinates; no elevation or safety interpretation.'))
styles=(root/'legacy/styles.css').read_text(encoding='utf-8')
marker=styles[styles.index('/* Simulated markers */'):styles.index('@media(max-width:800px)')]
extra='''
/* Integration additions; supplied panel layout and visual tokens retained. */
[hidden]{display:none!important}.leaflet-container{background:#17252b;font-family:inherit}.map-host{z-index:0}.leaflet-control-attribution{font-size:10px}.leaflet-control-scale-line{color:#152a36}.map-host .leaflet-bar a{color:#182e39}.leaflet-container button{font-family:inherit}
.layer-options{font-size:12px;margin-top:8px}.layer-controls{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}.layer-controls label{display:flex;align-items:center;gap:6px}.layer-controls input[type=range]{max-width:130px}.route-sequence{font-size:12px;padding-left:20px}.source-image{width:100%;height:auto}.source-list details{border-bottom:1px solid #668391;padding:10px 0}.sources-content a,.tablet-content a{color:#c7e1ef;overflow-wrap:anywhere}.sources-content select{max-width:100%;background:#405e6c;color:white}.plan-url{width:100%;min-width:0;margin:10px 0;background:#14232c;color:#e0e6e9}.standalone-tablet{max-width:560px;margin:auto;padding:12px}.tablet-device{padding:14px;min-width:0}.compact-map{padding:8px}.compact-map .map-surface{min-height:300px}.compact-map .map-top h3{font-size:16px}.compact-map .map-bottom{font-size:10px}.tablet-content .button{min-height:44px}.tablet-status{flex-wrap:wrap}.timeline li[aria-current]{border-left:3px solid #ffd38a;padding-left:8px}.timeline details{font-size:12px}.timeline-foot{overflow-wrap:anywhere}.stop-sub button{min-width:30px;min-height:30px}.modal{overflow-wrap:anywhere}.dashboard-fullscreen>.map-panel{grid-column:1/-1}
@media(max-width:650px){.modal{padding:12px}.tablet-device{padding:8px}.tablet-status span{margin-left:0}.classification span{width:90px}.timeline-controls select{min-width:70px}.map-host .leaflet-control-attribution{max-width:220px}.tablet-device .map-panel{padding:6px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
'''
edit('src/styles/main.css',lambda s:s+'\n'+marker+extra)
# Remove illustrative terrain rules rather than shipping dormant preview visuals.
import re
edit('src/styles/main.css',lambda s:re.sub(r'\.(?:map-demo|terrain-grid|map-marker|hab-marker|position-marker|demo-watermark)[^{]*\{[^}]*\}', '',s))
shutil.rmtree(root/'src/data')
# Copy source notes into the static build; provenance text is preserved verbatim.
for name in ['DATA_SOURCES.md','assets/README.md']:
    dest=root/'public/docs'/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/'docs'/name,dest)
