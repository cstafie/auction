import { 
	GET_MESSAGES,
	CREATE_MESSAGE,
	addMessage,
	setMessages,
} from '../../../src/redux/actions/room';
import {
	SEND_TO_ALL_IN_ROOM,
	SEND_TO_ROOM_SOCKET,
	sendToAllInRoom,
	sendToRoomSocket,
} from '../actions/room';

const ROOM_KEY = 'ROOM';

const room = ({dispatch, getState}) => next => action => {
  next(action);

  const enhanceAction = (newAction) => {
  	newAction.roomId = action.roomId;
  	newAction.socket = action.socket;
  	return newAction;
  }

  if (action.type === SEND_TO_ROOM_SOCKET) {
  	action.payload.socket.emit(ROOM_KEY, action.payload.action);
  } else if (action.type === SEND_TO_ALL_IN_ROOM) {
  
  	action.payload.roomChannel.emit(ROOM_KEY, action.payload.action);
  } else if (action.type === CREATE_MESSAGE) {	
 		const message = action.payload;
		dispatch(enhanceAction(addMessage(message)));
		dispatch(sendToAllInRoom(
			getState().lobby.rooms[action.roomId].channel,
			addMessage(message)
		));

 	} else if (action.type === GET_MESSAGES) {

 		getState().lobby.rooms[action.roomId]

 		dispatch(sendToRoomSocket(
 			action.socket,
 			setMessages(getState().lobby.rooms[action.roomId].messages)
		));
 	} 
}

export const roomMdl = [room];