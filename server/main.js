import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { store } from './redux/store';
import { socketReceive } from './redux/actions/socket';
import { connectUser, disconnectUser } from './redux/actions/users';

const app = express();
const server = http.Server(app);
const io = socketio(server); 

app.get('/', function(req, res) {});
server.listen(3001, function() {
  console.log('listening on *:3001');
});

const ACTION_CHANNEL = 'ACTION';
const emitSocketAction = (action) => io.emit(ACTION_CHANNEL, action);

const lobby = io
  .of('/lobby')
  .on('connection', (socket) => {
    console.log('user connected to lobby');
    store.dispatch(connectUser(socket));

    socket.on(ACTION_CHANNEL, (action) => {
      action.socket = socket;
      store.dispatch(socketReceive(action));
    });

    socket.on('disconnect', () => {
      store.dispatch(disconnectUser(socket))
    }); 
  });

export { emitSocketAction };



// let users = {};
// let messages = [];
// let colors = ['red', 'blue', 'green'];
// let socketUsers = [];

// let makeUserID = () => {
// 	return '_' + Math.random().toString(36).substr(2, 9);
// }

// let makeNewUser = (userName) => {
// 	if (colors.length && userName) {
// 		let newUser = {
// 			userName: userName,
// 			userId: makeUserID(),
// 			color: colors.splice(0,1)[0],
// 			joined: messages.length,
// 		}
// 		return newUser;
// 	}
// 	return null;
// }

// let emitMessage = (message=messages[messages.length-1]) => {
// 	socket.emit('message', message);
// }

// socket.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('user-message', ({userId, message}) => {
//   	console.log(userId, message);
//   	let user = users[userId];
//   	if (user) {
//   		messages.push({
//   			userName: user.userName, 
//   			color: user.color, 
//   			message: ` : ${message}`
//   		});
//   		emitMessage();
//   	}
//   	else {
//   		console.log('unidentified user tried to send a message');
//   	}
//   });

//   socket.on('connect-user', (userName, fn) => {
//   	console.log('connect-user');
//   	let newUser = null;;
//   	if (!socketUsers.map(su => su.socket).includes(socket) && colors.length && userName) {
//   		newUser = makeNewUser(userName, fn);
//   		socketUsers.push({socket, userId: newUser.userId});
//   	} 

//   	if (newUser) {
//   		users[newUser.userId] = newUser;
//   		console.log(newUser);
//   		fn(newUser);
//   		messages.push({
//         userName: newUser.userName, 
//         color: newUser.color, 
//         message: ' has joined the chat'
//       });
//       emitMessage();
//   	}
// 	});

//   socket.on('disconnect', () => {
//   	let suIndex = socketUsers.map(su=> su.socket).indexOf(socket);
//   	if (suIndex !== -1) {
// 	  	let user = users[socketUsers[suIndex].userId]
//       messages.push({
//         userName: user.userName, 
//         color: user.color, 
//         message: ' has left the chat'
//       });
//       emitMessage();
// 	  	colors.push(user.color);
// 	  	delete user;
// 	  	socketUsers.splice(suIndex,1);
//   	}
//     console.log('user disconnected');
//   });
// });
