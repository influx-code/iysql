from flask import Blueprint, send_from_directory
from json import dumps, loads
from flask_socketio import emit
from util import get_databases
from .iysql import IYSQL

iysql = Blueprint('iysql', __name__)
iysql_instance = IYSQL()

@iysql.route('/', methods=['GET'])
def hello():
    return 'hello'

@iysql.route('/public/<path:path>', methods=['GET'])
def index(path):
    return send_from_directory('public', path)

def get_types(json):
    types = iysql_instance.get_plugins()
    emit('get_types.result', {'ret':0, 'types':types})

def get_databases_itf(json):
    print('received message: ', dumps(json))
    try:
        datas = json['data']
        databases = get_databases(datas['host'], datas['port'], datas['user'], datas['password'])
    except Exception as e:
        emit('fetch_database.result', {'ret':-1, 'msg':'查询数据库失败，失败原因:%s' % str(e)})
    else:
        emit('fetch_database.result', {'ret':0, 'databases':databases})

def handle_message(json):
    print('received message: ' , dumps(json))
    choosed_plugins = json['data'].get('type', ['sqladvisor'])
    analysis_result = iysql_instance.execute_sql_analysis(choosed_plugins, json['data'])
    emit('sqladvisor.result', analysis_result)