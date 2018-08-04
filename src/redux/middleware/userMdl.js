import { SUBMIT_USERNAME } from '../actions/user';
import { push } from 'connected-react-router';

const updateUser = ({dispatch}) => next => action => {
	next(action);

	if (action.type === SUBMIT_USERNAME) {
		dispatch(push('/lobby'));
	}
}; 


export const userMdl = [updateUser];