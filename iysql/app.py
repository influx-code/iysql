from app import create_app
from flask_socketio import SocketIO

app = create_app()
socketIo = SocketIO(app)

@socketIo.on('message')
def handle_message(msg):
    print('received message: ' + msg)

if __name__ == '__main__':
    socketIo.run(app,
                 host=app.config.get('HOST'),
                 port=app.config.get('PORT'),
                 debug=app.config.get('DEBUG'))