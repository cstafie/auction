import io from 'socket.io-client';
import { socketReceive } from '../actions/socket';
import { CONNECT_TO_ROOM } from '../actions/room';

const ROOM_KEY = 'ROOM';
const ROOM = 'http://192.168.0.8:3001/room';
let socketConnection = undefined;

const connectToSocket = ({dispatch}) => next => action => {
	next(action);

	if (action.type === CONNECT_TO_ROOM) {
		socketConnection = io(`${ROOM}${action.payload.id}`);
		socketConnection.on(ROOM_KEY, action => {
			dispatch(socketReceive(action));
		});
	}
}