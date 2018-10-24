from config import configs
from flask import Flask
from flask_socketio import SocketIO

socketIO = SocketIO()

def create_app(config='default'):
    app = Flask(__name__, static_url_path='')
    app.config.from_object(configs[config])

    from .handles import iysql
    app.register_blueprint(iysql)

    socketIO.init_app(app)

    return app