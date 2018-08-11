import { 
	CREATE_ROOM, 
	USER_JOINED_ROOM,
	USER_LEFT_ROOM,
	updateRoom,
	addRoom,
	destroyRoom,
} from '../actions/lobby';
import { socketSend } from '../actions/socket';

const lobby = ({dispatch, getState}) => next => action => {
	next(action);

	if (action.type === CREATE_ROOM) {
		dispatch(socketSend(action));

		// let id = getState().lobby.rooms.length;
		// let room = {
		// 	id,
		// 	name: action.payload,
		// 	numUsers: 0,
		// }
		// dispatch(addRoom(room));
	} else if (action.type === USER_JOINED_ROOM) {
		let room = getState().lobby.rooms[action.payload];
		room.numUsers++;
		dispatch(updateRoom(room));
	} else if (action.type === USER_LEFT_ROOM) {
		let room = getState().lobby.rooms[action.payload];
		room.numUsers--;
		dispatch(room.numUsers ? updateRoom(room) : destroyRoom(room.id));
	}
}; 


export const lobbyMdl = [lobby];