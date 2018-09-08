import {
	CREATE_USER,
	addUser,
}	from '../../../src/redux/actions/user';
import {
	createLogMessage,
} from '../actions/room';

const users = ({dispatch, getState}) => next => action => {
	next(action);

	const enhanceAction = (newAction) => {

		newAction.roomChannel = action.roomChannel;
		newAction.roomId = action.roomId;
  	newAction.socket = action.socket;
  	return newAction;
	}

	if (action.type === CREATE_USER) {
		dispatch(addUser(action.payload, action.socket));
		dispatch(enhanceAction(createLogMessage(
			`${action.payload ? action.payload : '[incognito]'} joined the room`)));
	}
};


export const usersMdl = [users];