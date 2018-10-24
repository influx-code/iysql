from app import create_app
from flask_socketio import SocketIO
from json import dumps
app = create_app()
socketIo = SocketIO(app)

@socketIo.on('sqladvisor')
def handle_message(json):
    print('received message: ' , dumps(json))

if __name__ == '__main__':
    socketIo.run(app,
                 host=app.config.get('HOST'),
                 port=app.config.get('PORT'),
                 debug=app.config.get('DEBUG'))