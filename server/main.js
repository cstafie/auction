import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { store } from './redux/store';

const app = express();
const server = http.Server(app);
const io = socketio(server); 

app.get('/', function(req, res) {});
server.listen(3001, function() {
  console.log('listening on *:3001');
});

const LOBBY_CHANNEL = '/lobby';
const LOBBY_KEY = 'LOBBY';

const lobby = io
  .of(LOBBY_CHANNEL)
  .on('connection', (socket) => {
    console.log('user connected to lobby');

    socket.on(LOBBY_KEY, (action) => {
      action.socket = socket;
      store.dispatch(action);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected from lobby');
      socket.leave(LOBBY_CHANNEL);
    }); 
  });

const sendToLobbySender = (socket, action) => {
  socket.emit(LOBBY_KEY, action);
};

const sendToAllInLobby = (action) => {
  lobby.emit(LOBBY_KEY, action); 
};

export { sendToAllInLobby, io, sendToLobbySender  };
