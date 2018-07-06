
import { chatMessage } from './actions';

const socketDecapsulator = ({dispatch}) => next => action => {
  next(action);

 	if (action.type === 'RECEIVE_SOCKET_MESSAGE') {
 		switch (action.data.type) {
 			case 'CHAT_MESSAGE': 
 				dispatch(chatMessage(action.data.data));
 				break;
			// case 'CHAT_MESSAGE': 
 		// 		dispatch(chatMessage(action.data.data));
 		// 		break;
 			default:
 				break;
 		}
 	}
}

function createSocketEncapsulator(io) {
  return ({dispatch}) => next => action => {
    next(action);

	 	if (action.type === 'SEND_SOCKET_MESSAGE') {
	 		switch (action.data.type) {
	 			case 'CHAT_MESSAGE': 
	 				dispatch(chatMessage(action.data.data));
	 				break;
				// case 'CHAT_MESSAGE': 
	 		// 		dispatch(chatMessage(action.data.data));
	 		// 		break;
	 			default:
	 				break;
	 		}
	 	}
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

const socketEncapsulator 

export {socketDecapsulator, socketEncapsulator}