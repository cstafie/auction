import { 
	CREATE_ROOM, 
	GET_ROOMS,
	SET_ROOMS,
	startLoadingLobby,
	finishLoadingLobby
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
	}

	if (ACTION_MAP.hasOwnProperty(action.type)) {
		ACTION_MAP[action.type]();
	}

}; 


export const lobbyMdl = [lobby];