import BaseHTTPServer
import SimpleHTTPServer
import SocketServer

class ThreadingHTTPServer(SocketServer.ThreadingMixIn, BaseHTTPServer.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 5500), SimpleHTTPServer.SimpleHTTPRequestHandler)
    server.serve_forever()
