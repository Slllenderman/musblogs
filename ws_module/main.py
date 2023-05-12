from grpc_proxy import grpc_serve
from flask_app import app, socketio

if __name__ == "__main__":
    grpc_serve()
    socketio.run(app, debug=True)
