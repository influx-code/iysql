from config import load_plugins

class IYSQL:

    def __init__(self):
        self._plugins = list()
        for plugin_name, plugin_content in load_plugins.items():
            plugin_class = plugin_content['class']
            plugin_config = plugin_content['config']
            plugin_instance = plugin_class(plugin_config)
            self._plugins.append(plugin_name)
            self.__setattr__(plugin_name, plugin_instance)
    
    def get_plugins(self):
        return self._plugins

    def execute_sql_analysis(self, choosed_plugins, args):
        result = dict()
        for plugin_name in choosed_plugins:
            plugin_instance = getattr(self, plugin_name, None)
            if plugin_instance is None:
                raise TypeError('unsupported plugin')
            commond = plugin_instance.generate_query_commond(args)
            stdout = plugin_instance.execute_commond(commond)
            result[plugin_name] = stdout
        return result
