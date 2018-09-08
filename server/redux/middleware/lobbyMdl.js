import { 
	CREATE_ROOM, 
	GET_ROOMS,
	USER_JOINED_ROOM,
	USER_LEFT_ROOM,
	DESTROY_ROOM,
	UPDATE_ROOM,
	setRooms,
	addRoom, 
	userJoinedRoom, 
	updateRoom,
	destroyRoom,
	userLeftRoom } from '../../../src/redux/actions/lobby';
import {
	START_LOBBY,
	SEND_TO_ALL_IN_LOBBY,
	SEND_TO_LOBBY_SOCKET,
	sendToAllInLobby,
	sendToLobbySocket,
	setLobbyChannel,
} from '../actions/lobby';
import {
	sendToRoomSocket,
} from '../actions/room';
import {
	getUsername,
} from '../../../src/redux/actions/user';

const LOBBY_CHANNEL = '/lobby';
const LOBBY_KEY = 'LOBBY';
const ROOM_KEY = 'ROOM';

const makeID = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
};

const copyRoom = (room) => { // copy to send to front end without channel
	return {
		id: room.id,
		name: room.name,
		numUsers: room.numUsers,
		url: room.url,
	}
};

const lobby = ({dispatch, getState}) => next => action => {
  next(action);

  if (action.type === START_LOBBY) {

  	const lobbyChannel = getState().lobby.io
		  .of(LOBBY_CHANNEL)
		  .on('connection', (socket) => {
		    console.log('user connected to lobby');

		    socket.on(LOBBY_KEY, (action) => {
		      action.socket = socket;
		      dispatch(action);
		    });

		    socket.on('disconnect', () => {
		      console.log('user disconnected from lobby');
		      socket.leave(LOBBY_CHANNEL);
		    }); 
		  });

		dispatch(setLobbyChannel(lobbyChannel));

  } else if (action.type === CREATE_ROOM) {	
		let id = makeID();
		const ROOM_CHANNEL = `/room${id}`;

		const channel = getState().lobby.io
			.of(ROOM_CHANNEL)
		  .on('connection', (socket) => {

		  	const enhanceAction = (action) => {
		  		action.roomChannel = channel;
		  		action.roomId = id;
		    	action.socket = socket;
		    	return action;
		  	}

		    //console.log(`user connected to room ${id}`);
		    dispatch(enhanceAction(userJoinedRoom(id)));
		    dispatch(enhanceAction(sendToRoomSocket(socket, getUsername())));
		    // TODO: fix how gross this is

		    socket.on(ROOM_KEY, (action) => dispatch(enhanceAction(action)));

		    socket.on('disconnect', () => {
		      //console.log(`user disconnected from room ${id}`);
		      dispatch(enhanceAction(userLeftRoom(id)));
		      socket.leave(ROOM_CHANNEL);
		    });
	  	});

		const room = {
			id,
			name: action.payload,
			numUsers: 0,
			url: `http://192.168.2.52:3001/room${id}`,
			channel,
			messages: [],
		}

		dispatch(addRoom(room));
		dispatch(sendToAllInLobby(addRoom(copyRoom(room))));

 	} else if (action.type === SEND_TO_ALL_IN_LOBBY) {
 		getState().lobby.channel.emit(LOBBY_KEY, action.payload);

	} else if (action.type === SEND_TO_LOBBY_SOCKET) {
		action.payload.socket.emit(LOBBY_KEY, action.payload.action);

	} else if (action.type === GET_ROOMS) {
 		let roomsCopy = {};
 		let rooms = getState().lobby.rooms;

 		for (let id of Object.keys(rooms)) {
 			roomsCopy[id] = copyRoom(rooms[id]);
 		}

 		dispatch(sendToLobbySocket(action.socket, setRooms(roomsCopy)));

 	} else if (action.type === USER_JOINED_ROOM) {
 		let room = getState().lobby.rooms[action.payload];
		room.numUsers++;
		dispatch(updateRoom(room));

 	} else if (action.type === USER_LEFT_ROOM) {
 		let room = getState().lobby.rooms[action.payload];
		room.numUsers--;
		dispatch(room.numUsers > 0 ? updateRoom(room) : destroyRoom(room.id));

 	} else if (action.type === UPDATE_ROOM) {
 		dispatch(sendToAllInLobby(updateRoom(copyRoom(action.payload))));
 	} else if (action.type === DESTROY_ROOM) {
 		dispatch(sendToAllInLobby(action));
 	}
}

export const lobbyMdl = [lobby];