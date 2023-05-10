from flask_app import socketio, sessions
from flask_socketio import join_room, leave_room
from flask import request

@socketio.on('auth')   
def authorization(auth):
    if auth and "username" in list(auth):
        sessions[auth["username"]] = request.sid

@socketio.on('disconnect')
def disconnect():
    for user in list(sessions):
        if(sessions[user] == request.sid):
            del sessions[user]

@socketio.on('watch_blog')
def watch_blog(data):
    blog = data.blog
    join_room(blog)

@socketio.on('leave_blog')
def leave_blog(data):
    blog = data.blog
    leave_room(blog)
