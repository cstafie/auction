import { SOCKET_RECEIVE, SOCKET_SEND, socketReceive} from '../actions/socket';
import { CONNECT_USER } from '../actions/user';

import io from 'socket.io-client';

const ACTION_CHANNEL = 'ACTION';
const SERVER = 'http://192.168.0.8:3001';
let socketConnection = undefined;

const connectToSocket = ({dispatch}) => next => action => {
	next(action);

	if (action.type === CONNECT_USER) {
		socketConnection = io(SERVER);
		socketConnection.on(ACTION_CHANNEL, (action) => dispatch(socketReceive(action)));
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