var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {});

// TODO: put locks on critical sections

let makeUserID = () => '_' + Math.random().toString(36).substr(2, 9);

let userIDs = {};

let chat = {
	users: [],
	messages: [],
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('server-message', 'this is the server message');


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});