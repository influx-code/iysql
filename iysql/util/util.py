from os import popen
import pymysql.cursors

def execute_commond_get_stdout(commond):
    r = popen(commond)
    lines = r.readlines()
    return ''.join(lines)

def get_databases(host, port, user, password):
    connection = pymysql.connect(host=host,
                                 user=user,
                                 password=password,
                                 port=port,
                                 db='information_schema')
    try:
        pass
