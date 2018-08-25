import { 
	GET_MESSAGES,
	CREATE_MESSAGE,
	addMessage,
	setMessages,
} from '../../../src/redux/actions/room';


const ROOM_KEY = 'ROOM';

const room = ({dispatch, getState}) => next => action => {
  next(action);

  // TODO: figure out a cleaner way to do this;
  const sendToRoomSender = (socket, action) => {
  	socket.emit(ROOM_KEY, action);
  };

  const sendToAllInRoom = (roomChannel, action) => {
  	roomChannel.emit(ROOM_KEY, action);
  };

  const enhanceAction = (newAction) => {
  	newAction.roomId = action.roomId;
  	newAction.socket = action.socket;
  	return newAction;
  }

 	if (action.type === CREATE_MESSAGE) {	
 		const message = action.payload;
		dispatch(enhanceAction(addMessage(message)));
		sendToAllInRoom(
			getState().lobby.rooms[action.roomId].channel,
			addMessage(message)
		);

 	} else if (action.type === GET_MESSAGES) {
 		console.log('WHYYYY?', getState().lobby.rooms[action.roomId].messages);
 		sendToRoomSender(
 			action.socket,
 			setMessages(getState().lobby.rooms[action.roomId].messages)
		);
 	} 
}


export const roomMdl = [room];