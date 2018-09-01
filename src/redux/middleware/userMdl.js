import { SUBMIT_USERNAME } from '../actions/user';
import { push } from 'connected-react-router';
import { createUser } from '../actions/user';
import { sendToLobby } from '../actions/socket';

const updateUser = ({dispatch}) => next => action => {
	next(action);

	if (action.type === SUBMIT_USERNAME) {
		dispatch(push('/lobby'));
		dispatch(sendToLobby(createUser(action.payload)));
	}
}; 

export const userMdl = [updateUser];