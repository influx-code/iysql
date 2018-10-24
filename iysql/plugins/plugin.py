class Plugin:

    def read_config(self, configs):
        for config_name, config_value in configs:
            self.__setattr__(config_name, config_value)

    def generate_query_commond(self, args):
        pass

    def execute_commond(self, commond):
        pass