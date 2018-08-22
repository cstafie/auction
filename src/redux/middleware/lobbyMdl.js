import { 
	CREATE_ROOM, 
	USER_JOINED_ROOM,
	USER_LEFT_ROOM,
	GET_ROOMS,
	SET_ROOMS,
	startLoadingLobby,
	finishLoadingLobby,
	updateRoom,
	destroyRoom,
} from '../actions/lobby';
import { socketSend } from '../actions/socket';

const lobby = ({dispatch, getState}) => next => action => {
	next(action);

	const ACTION_MAP = {
		[GET_ROOMS]: () => {
			dispatch(startLoadingLobby());
			dispatch(socketSend(action));
		},
		[SET_ROOMS]: () => {
			dispatch(finishLoadingLobby());
		},
		[CREATE_ROOM]: () => {
			dispatch(socketSend(action));
		},
		[USER_JOINED_ROOM]: () => {
			let room = getState().lobby.rooms[action.payload];
			room.numUsers++;
			dispatch(updateRoom(room));
		},
		[USER_LEFT_ROOM]: () => {
			let room = getState().lobby.rooms[action.payload];
			room.numUsers--;
			dispatch(room.numUsers ? updateRoom(room) : destroyRoom(room.id));
		}
	}

	if (ACTION_MAP.hasOwnProperty(action.type)) {
		ACTION_MAP[action.type]();
	}

}; 


export const lobbyMdl = [lobby];