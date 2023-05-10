from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRETE_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
sessions = dict() # user - sessionId
