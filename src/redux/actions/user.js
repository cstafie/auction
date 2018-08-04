export const CONNECT_USER = '[user] Connect';
export const DISCONNECT_USER = '[user] Disconnect';
export const SUBMIT_USERNAME = '[user] Submit Username Event';
export const UPDATE_USER = '[user] Update';

export const submitUsername = event => ({
	type: SUBMIT_USERNAME,
	payload: event,
});

export const updateUser = user => ({
	type: UPDATE_USER,
	payload: user,
});
