from flask_app import socketio, app
from grpc_routes import grpc_serve
from waitress import serve
import ws_routes

grpc_server = grpc_serve()
grpc_server.start()

if __name__ == "__main__":
    socketio.run(app, debug=True)