from flask import Blueprint, send_from_directory

iysql = Blueprint('iysql', __name__)

@iysql.route('/', methods=['GET'])
def hello():
    return 'hello'

@iysql.route('/public/<path:path>', methods=['GET'])
def index(path):
    return send_from_directory('public', path)
