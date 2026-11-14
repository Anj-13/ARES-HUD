"""Serve the static production build (or --directory legacy for recovery)."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse


class DevelopmentHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def do_GET(self):
        # Ignore validators from earlier development-server responses.
        if "If-Modified-Since" in self.headers:
            del self.headers["If-Modified-Since"]
        super().do_GET()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8012)
    parser.add_argument("--directory", default="dist")
    args = parser.parse_args()
    directory = (Path(__file__).resolve().parent / args.directory).resolve()
    if not directory.is_dir():
        parser.error("Build first with npm run build, or choose --directory legacy")
    handler = partial(DevelopmentHandler, directory=str(directory))
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"ARES-HUD: http://localhost:{args.port}/", flush=True)
    server.serve_forever()
