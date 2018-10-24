from .plugin import Plugin
from util import execute_commond_get_stdout

class SQLAdvisor(Plugin):

    def __init__(self, configs):
        self.read_config(configs)

    def _generate_conn_str(self, args):
        return ' -u {} -p {} -h {} -P {} -d {} '.format(args.get('user', self._configs.get('user')),
                                                        args.get('passowrd', self._configs.get('password')),
                                                        args.get('host', self._configs.get('host')),
                                                        args.get('port', self._configs.get('port')),
                                                        args.get('database', self._configs.get('database')))

    def generate_query_commond(self, args):
        command_str = self._configs['execuable_path'] + ' '
        for skill_name, skill_content_dict in self._configs['skills'].items():
            if skill_content_dict['type'] == 0:
                command_str += ' {} '.format(skill_name)
            if skill_content_dict['type'] == 1:
                command_str += ' {} {} '.format(skill_name, skill_content_dict['default'])
        conn_str = self._generate_conn_str(args)
        command_str += conn_str
        command_str += ' -q "{}" '.format(args.get('sql'))
        command_str += ' -v 1 '
        return command_str

    def execute_commond(self, commond):
        return execute_commond_get_stdout(commond)
        