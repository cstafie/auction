import io from 'socket.io-client';
import { socketReceive } from '../actions/socket';
import { 
	CONNECT_TO_ROOM,
	DISCONNECT_FROM_ROOM,
	SEND_TO_ROOM,
	GET_MESSAGES,
	SET_MESSAGES,
	CREATE_MESSAGE,
	startLoadingRoom,
	finishLoadingRoom,
	sendToRoom,
	getMessages,
} from '../actions/room';

const ROOM_KEY = 'ROOM';
let socketConnection = undefined; // TODO: move to state

const room = ({dispatch, getState}) => next => action => {
	next(action);

	if (action.type === CONNECT_TO_ROOM) { 
		let room = action.payload;
		socketConnection = io(room.url);
		socketConnection.on(ROOM_KEY, action => {
			dispatch(socketReceive(action));
		});
		dispatch(getMessages(room.id));
	} else if (action.type === DISCONNECT_FROM_ROOM) {
		socketConnection.disconnect();
		socketConnection = undefined;
	} else if (action.type === SEND_TO_ROOM) {
		socketConnection.emit(ROOM_KEY, action.payload);
	} else if (action.type === GET_MESSAGES) {
		dispatch(startLoadingRoom());
		dispatch(sendToRoom(action));
	} else if (action.type === SET_MESSAGES) {
		dispatch(finishLoadingRoom());
	} else if (action.type === CREATE_MESSAGE) {
		dispatch(sendToRoom(action));
	}
}

export const roomMdl = [room];