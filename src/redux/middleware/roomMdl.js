import io from 'socket.io-client';
import { socketReceive } from '../actions/socket';
import { 
	CONNECT_TO_ROOM,
	DISCONNECT_FROM_ROOM,
} from '../actions/room';

const ROOM_KEY = 'ROOM';
let socketConnection = undefined;

const roomSocket = ({dispatch}) => next => action => {
	next(action);

	if (action.type === CONNECT_TO_ROOM) { 
		socketConnection = io(action.payload.url);
		socketConnection.on(ROOM_KEY, action => {
			dispatch(socketReceive(action));
		});
	} else if (action.type === DISCONNECT_FROM_ROOM) {
		console.log('trying to disconnect!!!');
		socketConnection.disconnect();
		socketConnection = undefined;
	}
}

export const roomMdl = [roomSocket];