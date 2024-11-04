from flask import Blueprint, jsonify
from flask_socketio import SocketIO, emit
from models import db, Message  # Make sure Message model is imported
from datetime import datetime

forum = Blueprint('forum', __name__)

# Initialize SocketIO
socketio = SocketIO()

@forum.route('/api/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([msg.serialize() for msg in messages]), 200

@socketio.on('send_message')
def handle_send_message(data):
    new_message = Message(content=data['content'])
    db.session.add(new_message)
    db.session.commit()

    # Broadcast the new message to all connected clients
    emit('receive_message', new_message.serialize(), broadcast=True)
