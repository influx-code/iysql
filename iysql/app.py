from app import create_app, handle_message, get_databases_itf, get_types
from flask_socketio import SocketIO
from json import dumps

app = create_app()
socketIo = SocketIO(app)
socketIo.on_event('sqladvisor', handle_message)
socketIo.on_event('fetch_database', get_databases_itf)
socketIo.on_event('get_types', get_types)

if __name__ == '__main__':
    socketIo.run(app,
                 host=app.config.get('HOST'),
                 port=app.config.get('PORT'),
                 debug=app.config.get('DEBUG'))