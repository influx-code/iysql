from os import environ

sqladvisor_configs = {
    'execuable_path': environ.get('sqladvisor', 'sqladvisor'),
    'user': 'root',
    'password': 'root',
    'host': '127.0.0.1',
    'port': 3306,
    'database': 'blog',
    'skills': {}
}