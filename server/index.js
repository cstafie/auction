require = require("esm")(module/*, options*/)
module.exports = require("./main.js")

// import express from 'express';
// import http from 'http';
// import socketio from 'socket.io';
// import { store } from './redux/store';

// // init server;
// const app = express();
// const server = http.server(app);
// const io = socketio(server); 

// app.get('/', function(req, res) {});
// server.listen(3001, function() {
//   console.log('listening on *:3001');
// });


// const ACTION_CHANNEL = 'ACTION';

// io.on('connection', (socket) => {
//   console.log('user connected');

//   socket.on('ACTION', () => {

//   });
// });