import { CREATE_ROOM, addRoom } from '../../../src/redux/actions/lobby';
import { CONNECT_USER } from '../actions/users';
import { sendToAllInLobby } from '../../main';
// import { emitSocketAction } from '../../main';

const lobby = ({dispatch, getState}) => next => action => {
  next(action);

 	if (action.type === CREATE_ROOM) {

 			let id = getState().lobby.rooms.length;
			let room = {
				id,
				name: action.payload,
				numUsers: 0,
			}

			const addRoomAction = addRoom(room);
			dispatch(addRoomAction); // TODO: this counts on this action succeeding...
			sendToAllInLobby(addRoomAction);
 	}
}


export const lobbyMdl = [lobby];