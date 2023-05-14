from flask_app import socketio

class WsProtoActions:
    @classmethod
    def addpost(self, data):
        socketio.emit('addpost', {"a" : "b"})