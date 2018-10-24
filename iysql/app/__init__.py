from config import configs
from flask import Flask
from .handles import handle_message, get_databases_itf, get_types

def create_app(config='default'):
    app = Flask(__name__, static_url_path='')
    app.config.from_object(configs[config])

    from .handles import iysql
    app.register_blueprint(iysql)

    return app