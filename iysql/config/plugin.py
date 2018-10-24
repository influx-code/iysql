from .soar import soar_configs
from .sqladvisor import sqladvisor_configs
from plugins import Soar, SQLAdvisor

load_plugins = {
    'soar': {
        'class': Soar,
        'config': soar_configs
    },
    'sqladvisor': {
        'class': SQLAdvisor,
        'config': sqladvisor_configs
    }
}