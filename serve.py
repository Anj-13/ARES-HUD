"""Local development server: stable workspace root, no stale JS/CSS cache."""
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
    args = parser.parse_args()
    handler = partial(DevelopmentHandler, directory=str(Path(__file__).resolve().parent))
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"ARES-HUD: http://localhost:{args.port}/", flush=True)
    server.serve_forever()
