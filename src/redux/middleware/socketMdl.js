import io from 'socket.io-client';
import { 
	SOCKET_RECEIVE, 
	SOCKET_SEND, 
	CONNECT_TO_LOBBY, 
	socketReceive, 
} from '../actions/socket';

const ACTION_CHANNEL = 'ACTION';
const LOBBY = 'http://localhost:3001/lobby';
let socketConnection = undefined;

const connectToSocket = ({dispatch}) => next => action => {
	next(action);

	if (action.type === CONNECT_TO_LOBBY) {
		socketConnection = io(LOBBY);
		socketConnection.on(ACTION_CHANNEL, action => dispatch(socketReceive(action)));
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
  	socketConnection.emit(ACTION_CHANNEL, action.paylod); // TODO: assert action payload is always an action
  }
};

export const socketMdl = [connectToSocket, socketDecapsulator, socketEncapsulator];
