import { 
	CREATE_ROOM, 
	GET_ROOMS,
	setRooms,
	addRoom, 
	userJoinedRoom, 
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
		    store.dispatch(userJoinedRoom(id));
		    sendToAllInLobby(userJoinedRoom(id));

		    socket.on(ROOM_KEY, (action) => {
		      store.dispatch(action);
		    });

		    socket.on('disconnect', () => {
		      console.log(`user disconnected from room ${id}`);
		      store.dispatch(userLeftRoom(id));
		      sendToAllInLobby(userLeftRoom(id));
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
 	}
}


export const lobbyMdl = [lobby];