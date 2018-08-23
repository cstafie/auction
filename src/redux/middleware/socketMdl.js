import io from 'socket.io-client';
import { 
	SOCKET_RECEIVE, 
	SOCKET_SEND, 
	socketReceive,
} from '../actions/socket';
import { 
	CONNECT_TO_LOBBY,
	getRooms,
} from '../actions/lobby';

const LOBBY_KEY = 'LOBBY';
const LOBBY = 'http://localhost:3001/lobby';
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

const socketDecapsulator = ({dispatch}) => next => action => {
  next(action);

 	if (action.type === SOCKET_RECEIVE) {
 		dispatch(action.payload); // TODO: assert action payload is always an action
 	}
}

const socketEncapsulator = ({dispatch}) => next => action => {
  next(action);
  
  if (action.type === SOCKET_SEND) { // TODO: look at socket.io for error handling
  	socketConnection.emit(LOBBY_KEY, action.payload); // TODO: assert action payload is always an action
  }
};

export const socketMdl = [connectToSocket, socketDecapsulator, socketEncapsulator];
