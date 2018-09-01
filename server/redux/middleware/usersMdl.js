import {
	CREATE_USER,
	addUser,
}	from '../../../src/redux/actions/user';

const users = ({dispatch, getState}) => next => action => {
	next(action);

	if (action.type === CREATE_USER) {
		console.log("CREATING USER!!!!", action.payload)
		dispatch(addUser(action.payload, action.socket));
	}
};


export const usersMdl = [users];