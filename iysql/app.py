from app import create_app, handle_message
from flask_socketio import SocketIO
from json import dumps

app = create_app()
socketIo = SocketIO(app)
socketIo.on_event('sqladvisor', handle_message)

if __name__ == '__main__':
    socketIo.run(app,
                 host=app.config.get('HOST'),
                 port=app.config.get('PORT'),
                 debug=app.config.get('DEBUG'))