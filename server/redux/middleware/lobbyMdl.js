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
import { sendToAllInLobby, sendToLobbySender, io } from '../../main';

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

  //console.log(action);

 	if (action.type === CREATE_ROOM) {	
		let id = makeID();
		const ROOM_CHANNEL = `/room${id}`;

		const channel = io
			.of(ROOM_CHANNEL)
		  .on('connection', (socket) => {
		    console.log(`user connected to room ${id}`);
		    dispatch(userJoinedRoom(id));

		    socket.on(ROOM_KEY, (action) => {
		    	console.log('attaching id to action', id, action);
		    	action.roomId = id;
		    	action.socket = socket;
		      dispatch(action);
		    });

		    socket.on('disconnect', () => {
		      console.log(`user disconnected from room ${id}`);
		      dispatch(userLeftRoom(id));
		      socket.leave(ROOM_CHANNEL);
		    });
    	});

		const room = {
			id,
			name: action.payload,
			numUsers: 0,
			url: `http://192.168.0.8:3001/room${id}`,
			channel,
			messages: [],
		}

		dispatch(addRoom(room));
		sendToAllInLobby(addRoom(copyRoom(room)));

 	} else if (action.type === GET_ROOMS) {
 		let roomsCopy = {};
 		let rooms = getState().lobby.rooms;

 		for (let id of Object.keys(rooms)) {
 			roomsCopy[id] = copyRoom(rooms[id]);
 		}
 		sendToLobbySender(action.socket, setRooms(roomsCopy));

 	} else if (action.type === USER_JOINED_ROOM) {
 		let room = getState().lobby.rooms[action.payload];
		room.numUsers++;
		dispatch(updateRoom(room));

 	} else if (action.type === USER_LEFT_ROOM) {
 		let room = getState().lobby.rooms[action.payload];
		room.numUsers--;
		dispatch(room.numUsers > 0 ? updateRoom(room) : destroyRoom(room.id));

 	} else if (action.type === UPDATE_ROOM) {
 		sendToAllInLobby(updateRoom(copyRoom(action.payload)));
 	} else if (action.type === DESTROY_ROOM) {
 		sendToAllInLobby(action);
 	}
}

export const lobbyMdl = [lobby];