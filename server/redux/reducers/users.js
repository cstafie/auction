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

			let userToSocket = new Map(state.userToSocket);
			userToSocket.set(action.payload.username, action.payload.socket.id);

			let socketToUser = new Map(state.socketToUser);
			socketToUser.set(action.payload.socket.id, action.payload.username);

			console.log(socketToUser.size);
			console.log(action.payload.socket.id);
			console.log(socketToUser.get(action.payload.socket.id));

			return {
				...state,
				userToSocket,
				socketToUser,
			}
		default:
			return state;
	}
};

export default users;