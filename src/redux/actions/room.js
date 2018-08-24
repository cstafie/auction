export const CONNECT_TO_ROOM = '[room] Connect to room';
export const DISCONNECT_FROM_ROOM = '[room] Disconnect from room';
export const SEND_TO_ROOM = '[room] Send to room';
export const GET_MESSAGES = '[room] Get messages';
export const SET_MESSAGES = '[room] Set messages';
export const CREATE_MESSAGE = '[room] Create message';
export const ADD_MESSAGE = '[room] Add message';
export const START_LOADING_ROOM = '[room] Start loading room';
export const FINISH_LOADING_ROOM = '[room] Finish loading room';

export const connectToRoom = room => ({
	type: CONNECT_TO_ROOM,
	payload: room
});

export const disconnectFromRoom = room => ({
	type: DISCONNECT_FROM_ROOM,
	payload: room
});

export const sendToRoom = action => ({
	type: SEND_TO_ROOM,
	payload: action,
});

export const getMessages = () => ({
	type: GET_MESSAGES,
});

export const setMessages = messages => ({
	type: SET_MESSAGES,
	payload: messages,
});

export const addMessage = message => ({
	type: ADD_MESSAGE,
	payload: message,
});

export const createMessage = message => ({
	type: CREATE_MESSAGE,
	payload: message,
})

export const startLoadingRoom = () => ({
	type: START_LOADING_ROOM,
});

export const finishLoadingRoom = () => ({
	type: FINISH_LOADING_ROOM,
});