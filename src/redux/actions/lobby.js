export const CREATE_ROOM = '[lobby] Create room';
export const ADD_ROOM = '[lobby] Add room';
export const UPDATE_ROOM = '[lobby] Update room';
export const DESTROY_ROOM = '[lobby] Destroy room';
export const USER_JOINED_ROOM = '[lobby] User joined room';
export const USER_LEFT_ROOM = '[lobby] User left room';
export const SET_ROOMS = '[lobby] Set rooms';

export const setRooms = rooms => ({
	type: SET_ROOMS,
	payload: rooms,
});

export const createRoom = roomName => ({
	type: CREATE_ROOM,
	payload: roomName,
});

export const addRoom = room => ({
	type: ADD_ROOM,
	payload: room,
});

export const updateRoom = room => ({
	type: UPDATE_ROOM,
	payload: room,
});

export const destroyRoom = roomId => ({
	type: DESTROY_ROOM,
	payload: roomId, 
});

export const userJoinedRoom = roomId => ({
	type: USER_JOINED_ROOM,
	payload: roomId,
});

export const userLeftRoom = roomId => ({
	type: USER_LEFT_ROOM,
	payload: roomId,
});