from flask import Flask, request, render_template
from flask_socketio import SocketIO, ConnectionRefusedError, join_room, leave_room

app = Flask(__name__)
app.config['SECRETE_KEY'] = 'secret!'
socketio = SocketIO(app)
sessions = dict() # user - [sessionId, token]

@app.route('/')
def index():
    return render_template('test_client.html')

@socketio.on('connect')
def connection(auth):
    if not auth or auth.token:
        raise ConnectionRefusedError('token was not provided')
    if auth.token not in sessions:
        raise ConnectionRefusedError('invalid token')
    sessions[auth.username] = request.sid
    
@socketio.on('watch_blog')
def watch_blog(data):
    blog = data.blog
    join_room(blog)

@socketio.on('leave_blog')
def leave_blog(data):
    blog = data.blog
    leave_room(blog)




if __name__ == "__main__":
    socketio.run(app)
