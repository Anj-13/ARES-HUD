
import { useState } from "react";
import "./styles.css";

const DISCLAIMER =
    "Hackathon planning demonstrator. Routes and hazards are simulated; not flight-qualified navigation.";

export default function App() {
    const [view, setView] = useState("map");
    const [fullscreen, setFullscreen] = useState(false);
    const [dialog, setDialog] = useState(null);

    return (
        <main className="ares-app">
            <header className="hud-header">
                <div>
                    <h1>ARES-HUD / MISSION CONTROL</h1>
                    <p>TEAM MARTIAN · EVA PLANNING · PROTOTYPE</p>
                </div>

                <nav className="hud-actions" aria-label="Display controls">
                    <button
                        type="button"
                        aria-pressed={view === "globe"}
                        onClick={() => setView("globe")}
                    >
                        Globe
                    </button>
                    <button
                        type="button"
                        aria-pressed={view === "map" && fullscreen}
                        onClick={() => {
                            setView("map");
                            setFullscreen(v => !v);
                        }}
                    >
                        {fullscreen ? "Exit fullscreen" : "Fullscreen map"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setDialog("tablet")}
                    >
                        Send to Tablet
                    </button>
                </nav>
            </header>

            <div className={`hud-layout ${fullscreen ? "fullscreen" : ""}`}>
                {!fullscreen && (
                    <aside className="hud-panel mission-panel">
                        <h2>Mission Panel</h2>
                        <div id="mission-controls-mount">
                            {/* Replace with migrated MissionControls */}
                        </div>
                    </aside>
                )}

                <section className="hud-map" aria-label="Mars mission viewport">
                    <div className="map-heading">
                        <h2>{view === "map" ? "Mars Map" : "Mars Globe"}</h2>
                        <span>OBSERVED IMAGERY · SIMULATED MISSION</span>
                    </div>

                    <div className="map-viewport">
                        {view === "map" ? (
                            <div id="mars-map" className="map-canvas" />
                        ) : (
                            <div className="globe-placeholder">
                                3D Mars globe — pending verified integration
                                <button type="button" onClick={() => setView("map")}>
                                    Return to map
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {!fullscreen && (
                    <aside className="hud-panel telemetry-panel">
                        <h2>EVA Telemetry</h2>
                        <div id="telemetry-mount">
                            {/* Replace with migrated Telemetry */}
                        </div>
                    </aside>
                )}

                {!fullscreen && (
                    <section className="hud-panel timeline-panel">
                        <h2>Sol Timeline / Mission Log</h2>
                        <div id="timeline-mount">
                            {/* Replace with migrated SolTimeline */}
                        </div>
                    </section>
                )}
            </div>

            <footer className="hud-footer">
                <div>
                    <strong>OBSERVED MAP · SIMULATED EVA</strong>
                    <p>{DISCLAIMER}</p>
                </div>
                <button type="button" onClick={() => setDialog("sources")}>
                    Sources & Mission Notes
                </button>
            </footer>

            {dialog && (
                <div className="dialog-backdrop">
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-label={dialog === "tablet" ? "Tablet" : "Sources and mission notes"}
                        className="hud-dialog"
                    >
                        <header className="dialog-header">
                            <h2>
                                {dialog === "tablet"
                                    ? "EVA Wrist Tablet"
                                    : "Sources & Mission Notes"}
                            </h2>
                            <button type="button" onClick={() => setDialog(null)}>
                                Close
                            </button>
                        </header>
                        {dialog === "tablet" ? (
                            <div id="tablet-mount">
                                {/* Existing tablet feature goes here */}
                            </div>
                        ) : (
                            <div id="sources-mount">
                                {/* Existing source and mission-note content goes here */}
                            </div>
                        )}
                        <p className="dialog-disclaimer">{DISCLAIMER}</p>
                    </section>
                </div>
            )}
        </main>
    );
}
