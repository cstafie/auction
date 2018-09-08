import { 
	GET_MESSAGES,
	CREATE_MESSAGE,
	addMessage,
	setMessages,
} from '../../../src/redux/actions/room';
import {
	SEND_TO_ALL_IN_ROOM,
	SEND_TO_ROOM_SOCKET,
	CREATE_LOG_MESSAGE,
	sendToAllInRoom,
	sendToRoomSocket,
} from '../actions/room';

const ROOM_KEY = 'ROOM';

const room = ({dispatch, getState}) => next => action => {
  next(action);

  const enhanceAction = (newAction) => {
  	newAction.roomChannel = action.roomChannel;
  	newAction.socket = action.socket;
  	newAction.roomId = action.roomId;
  	return newAction;
  }

  if (action.type === SEND_TO_ROOM_SOCKET) {
  	action.payload.socket.emit(ROOM_KEY, action.payload.action);
  } else if (action.type === SEND_TO_ALL_IN_ROOM) {

  	action.payload.roomChannel.emit(ROOM_KEY, action.payload.action);
  } else if (action.type === CREATE_MESSAGE) {	
  	const username = getState().users.socketToUser.get(action.socket.id);
  	console.log(action.socket.id);
  	console.log(getState().users.socketToUser.get(action.socket.id));
 		const message = {
 			message: action.payload,
 			username: username ? username : '[incognito]',
 		} 

		dispatch(enhanceAction(addMessage(message)));
		dispatch(sendToAllInRoom(
			action.roomChannel,
			addMessage(message)
		));

 	} else if (action.type === GET_MESSAGES) {

 		//getState().lobby.rooms[action.roomId]

 		dispatch(sendToRoomSocket(
 			action.socket,
 			setMessages(getState().lobby.rooms[action.roomId].messages)
		));
 	} else if (action.type === CREATE_LOG_MESSAGE) { // TODO: fix
 		const message = {
 			username: '[log]',
	 		message: action.payload,
 		}
 		dispatch(enhanceAction(addMessage(message)));
		dispatch(sendToAllInRoom(
			action.roomChannel,
			addMessage(message)
		));
 	}
}

export const roomMdl = [room];