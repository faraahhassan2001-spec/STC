import BaseHTTPServer
import SimpleHTTPServer
import SocketServer

class ThreadingHTTPServer(SocketServer.ThreadingMixIn, BaseHTTPServer.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class NoCacheRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)

if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 5500), NoCacheRequestHandler)
    server.serve_forever()
