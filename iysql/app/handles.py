from flask import Blueprint, send_from_directory
from . import socketIO

iysql = Blueprint('iysql', __name__)

@iysql.route('/public/<path:path>', methods=['GET'])
def index(path):
    return send_from_directory('public', path)

@socketIO.on('message')
def handle_message(message):
    print('received message: ' + message)