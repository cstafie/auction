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

// user messaeges

// TODO: cookie for userId to do reconnect

// game messages ? or should that go in game log

let users = {};
let messages = [];
let colors = ['red', 'blue', 'green'];
let socketUsers = [];

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
	io.emit('user-joined', {userName, color});
}

let emitMessage = () => {
	io.emit('add-message', messages[messages.length-1]);
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('user-message', ({userId, message}) => {
  	console.log(userId, message);
  	let user = users[userId];
  	if (user) {
  		messages.push({
  			userName: user.userName, 
  			color: user.color, 
  			message
  		});
  		console.log(messages);
  		emitMessage();
  	}
  	else {
  		console.log('unidentified user tried to send a message');
  	}
  });

  socket.on('connect-user', (userName, fn) => {
  	console.log('connect-user');
  	let newUser = null;;
  	if (!socketUsers.map(su => su.socket).includes(socket) && colors.length && userName) {
  		newUser = makeNewUser(userName, fn);
  		socketUsers.push({socket, userId: newUser.userId});
  	} 

  	if (newUser) {
  		users[newUser.userId] = newUser;
  		console.log(newUser);
  		fn(newUser);
  		emitNewUser(newUser.userName, newUser.color);
  	}
	});

  socket.on('disconnect', () => {
  	let suIndex = socketUsers.map(su=> su.socket).indexOf(socket);
  	if (suIndex !== -1) {
	  	let userId = socketUsers[suIndex].userId
	  	colors.push(users[userId].color);
	  	delete users[userId];
	  	socketUsers.splice(suIndex,1);
  	}
    console.log('user disconnected');
  });
});












