import io from 'socket.io-client';
import { 
	SOCKET_RECEIVE, 
	SEND_TO_LOBBY, 
	socketReceive,
} from '../actions/socket';
import { 
	CONNECT_TO_LOBBY,
	getRooms,
} from '../actions/lobby';

const LOBBY_KEY = 'LOBBY';
const LOBBY = 'http://192.168.0.8:3001/lobby';
let socketConnection = undefined;

const connectToSocket = ({dispatch}) => next => action => {
	next(action);

	if (action.type === CONNECT_TO_LOBBY) {
		socketConnection = io(LOBBY);
		socketConnection.on(LOBBY_KEY, action => {
			dispatch(socketReceive(action));
		});
		dispatch(getRooms());
	}
}

const socketTunnel = ({dispatch}) => next => action => {
  next(action);

 	if (action.type === SOCKET_RECEIVE) {
 		dispatch(action.payload); // TODO: assert action payload is always an action
 	} else if (action.type === SEND_TO_LOBBY) { // TODO: look at socket.io for error handling
  	socketConnection.emit(LOBBY_KEY, action.payload); // TODO: assert action payload is always an action
  }
}

export const socketMdl = [connectToSocket, socketTunnel];
