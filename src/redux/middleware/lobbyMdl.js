import { 
	CREATE_ROOM, 
	GET_ROOMS,
	SET_ROOMS,
	startLoadingLobby,
	finishLoadingLobby
} from '../actions/lobby';
import { sendToLobby } from '../actions/socket';

const lobby = ({dispatch, getState}) => next => action => {
	next(action);

	const ACTION_MAP = {
		[GET_ROOMS]: () => {
			dispatch(startLoadingLobby());
			dispatch(sendToLobby(action));
		},
		[SET_ROOMS]: () => {
			dispatch(finishLoadingLobby());
		},
		[CREATE_ROOM]: () => {
			dispatch(sendToLobby(action));
		},
	}

	if (ACTION_MAP.hasOwnProperty(action.type)) {
		ACTION_MAP[action.type]();
	}

}; 


export const lobbyMdl = [lobby];