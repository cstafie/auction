import {
	ADD_USER,
}	from '../../../src/redux/actions/user';

const defaultState = {
	userToSocket: new Map(),
	socketToUser: new Map(),
};

const users = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_USER: 
			return {
				...state,
				userToSocket: {
					...state.userToSocket,
					[action.payload.username]: action.payload.socket,
				},
				socketToUser: {
					...state.socketToUser,
					[action.payload.socket]: action.payload.username,
				}
			}
		default:
			return state;
	}
};

export default users;