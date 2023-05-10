from ws_routes import socketio, app
from grpc_proxy import grpc_serve

if __name__ == "__main__":
    grpc_serve()
    socketio.run(app, debug=True)
