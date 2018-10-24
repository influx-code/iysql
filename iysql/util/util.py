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
    databases = list()
    try:
        with connection.cursor() as cursor:
            sql = 'SELECT schema_name FROM information_schema.schemata'
            cursor.execute(sql)
            result = cursor.fetchall()
            for result_tuple in result:
                databases.append(result_tuple[0])
    except Exception as e:
        raise Exception('查询数据库失败，失败原因:%s' % str(e))
    else:
        return databases
    finally:
        connection.close()