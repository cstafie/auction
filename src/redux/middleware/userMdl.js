import { SUBMIT_USERNAME } from '../actions/user';
import { push } from 'connected-react-router';
import { 
	createUser, 
	GET_USERNAME,
} from '../actions/user';
import { sendToRoom } from '../actions/room';

const updateUser = ({dispatch, getState}) => next => action => {
	next(action);

	if (action.type === SUBMIT_USERNAME) {
		dispatch(push('/lobby'));
	} else if (action.type === GET_USERNAME) {
		const username = getState().user.username;
		dispatch(sendToRoom(createUser(username)));
	}
}; 

export const userMdl = [updateUser];