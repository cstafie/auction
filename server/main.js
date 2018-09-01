import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { startLobby } from './redux/actions/lobby';
import { store } from './redux/store';

const app = express();
const server = http.Server(app);
const io = socketio(server); 

app.get('/', function(req, res) {});

server.listen(3001, function() {
  console.log('listening on *:3001');
});

store.dispatch(startLobby(io));