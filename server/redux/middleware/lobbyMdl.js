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
import { CONNECT_USER } from '../actions/users';
import { sendToAllInLobby, sendToLobbySender, io } from '../../main';
// import { emitSocketAction } from '../../main';

const ROOM_KEY = 'ROOM';

const lobby = ({dispatch, getState}) => next => action => {
  next(action);

  console.log(action);

 	if (action.type === CREATE_ROOM) {	
		const id = getState().lobby.rooms.length;
		const ROOM_CHANNEL = `/room${id}`;

		const channel = io
			.of(ROOM_CHANNEL)
		  .on('connection', (socket) => {
		    console.log(`user connected to room ${id}`);
		    dispatch(userJoinedRoom(id));
		    //sendToAllInLobby(userJoinedRoom(id));

		    socket.on(ROOM_KEY, (action) => {
		      store.dispatch(action);
		    });

		    socket.on('disconnect', () => {
		      console.log(`user disconnected from room ${id}`);
		      dispatch(userLeftRoom(id));
		      //sendToAllInLobby(userLeftRoom(id));
		      socket.leave(ROOM_CHANNEL);
		      //store.dispatch(disconnectUser(socket));
		    });
    	});

		const room = {
			id,
			name: action.payload,
			numUsers: 0,
			url: `http://localhost:3001/room${id}`
		}

		dispatch(addRoom({...room, channel}));
		sendToAllInLobby(addRoom(room));
 	} else if (action.type === GET_ROOMS) {
 		let rooms = getState().lobby.rooms.map(room => {
 			let roomCopy = {...room};
 			delete roomCopy.channel;
 			return roomCopy;
 		});
 		sendToLobbySender(action.socket, setRooms(rooms));
 	} else if (action.type === USER_JOINED_ROOM) {
 		let room = getState().lobby.rooms[action.payload];
			room.numUsers++;
			dispatch(updateRoom(room));
 	} else if (action.type === USER_LEFT_ROOM) {
 		let room = getState().lobby.rooms[action.payload];
		room.numUsers--;
		dispatch(room.numUsers > 0 ? updateRoom(room) : destroyRoom(room.id));
 	} else if (action.type === UPDATE_ROOM) {
 		let roomCopy = {...action.payload};
 		delete roomCopy.channel;
 		sendToAllInLobby(updateRoom(roomCopy));
 	} else if (action.type === DESTROY_ROOM) {
 		sendToAllInLobby(action);
 	}
}


export const lobbyMdl = [lobby];