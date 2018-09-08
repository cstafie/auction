// export const CONNECT_USER = '[user] Connect';
// export const DISCONNECT_USER = '[user] Disconnect';
export const SUBMIT_USERNAME = '[user] Submit Username Event';
export const UPDATE_USER = '[user] Update';
export const GET_USERNAME = '[user] Get username'

export const submitUsername = username => ({
	type: SUBMIT_USERNAME,
	payload: username,
});

export const updateUser = user => ({
	type: UPDATE_USER,
	payload: user,
});

export const getUsername = () => ({
	type: GET_USERNAME,
});


// TODO: should be in backend code but get the following error
// Module not found: You attempted to import ../../../server/redux/actions/users 
// which falls outside of the project src/ directory. Relative imports outside of 
// src/ are not supported. You can either move it inside src/, or add a symlink to it from project's node_modules/.

export const CREATE_USER = '[users] Create user';
export const ADD_USER = '[users] Add user';

export const createUser = (username) => ({
	type: CREATE_USER,
	payload: username,
});

export const addUser = (username, socket) => ({
	type: ADD_USER,
	payload: {username, socket},
});

