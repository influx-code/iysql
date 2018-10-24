class Plugin:

    def read_config(self, configs):
        self._configs = dict()
        for config_name, config_value in configs.items():
            self._configs[config_name] = config_value

    def generate_query_commond(self, args):
        pass

    def execute_commond(self, commond):
        pass