export const CONNECT_USER = '[user] Connect';
export const DISCONNECT_USER = '[user] Disconnect';
export const HANDLE_SUBMIT_USERNAME = '[user] Submit Username Event';
export const UPDATE_USER = '[user] Update';

export const handleSubmitUsername = event => ({
	type: HANDLE_SUBMIT_USERNAME,
	payload: event,
});

export const connectUser = () => ({
	type: CONNECT_USER,
});

export const disconnectUser = () => ({
	type: DISCONNECT_USER,
});

export const updateUser = user => ({
	type: UPDATE_USER,	
	payload: user,
});
