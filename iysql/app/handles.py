from flask import Blueprint, send_from_directory
from json import dumps, loads
from flask_socketio import emit
from .iysql import IYSQL

iysql = Blueprint('iysql', __name__)
iysql_instance = IYSQL()

@iysql.route('/', methods=['GET'])
def hello():
    return 'hello'

@iysql.route('/public/<path:path>', methods=['GET'])
def index(path):
    return send_from_directory('public', path)

def handle_message(json):
    print('received message: ' , dumps(json))
    choosed_plugins = ['soar']
    sql = json['data']['sql']
    analysis_result = iysql_instance.execute_sql_analysis(choosed_plugins, {'sql': sql})
    emit('sqladvisor.result', analysis_result)