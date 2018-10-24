from flask import Blueprint
from . import socketIO

iysql = Blueprint('iysql', __name__)

@iysql.route('/', methods=['GET'])
def index():
    return 'Hello World'

@socketIO.on('message')
def handle_message(message):
    print('received message: ' + message)