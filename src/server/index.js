var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

// TODO: put locks on critical sections

// server messages
// - when user connects - emit to all
// - when user disconnects - emit to all

// user messages

// game messages ? or should that go in game log

let users = {};
let messages = [];
let colors = ['red', 'blue', 'green'];
let sockets = [];

let makeUserID = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
}

let makeNewUser = (userName) => {
	if (colors.length && userName) {
		let newUser = {
			userName: userName,
			userId: makeUserID(),
			color: colors.splice(0,1)[0],
			joined: messages.length,
		}
		return newUser;
	}
	return null;
}

let emitNewUser = (userName, color) => {
	io.emit('new-user', {userName, color});
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('connect-user', (userName, fn) => {
  	let newUser = null;;
  	if (!sockets.includes(socket)) {
  		sockets.push(socket);
  		newUser = makeNewUser(userName, fn);
  	} 

  	if (newUser) {
  		users[newUser.userId] = newUser;
  		fn(newUser);
  		emitNewUser(newUser.userName, newUser.color);
  	}
	});

  socket.on('disconnect', () => {
  	sockets.splice(sockets.indexOf(socket),1);
    console.log('user disconnected');
  });
});












