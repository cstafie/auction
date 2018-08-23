export const CONNECT_TO_ROOM = '[room] Connect to room';
export const DISCONNECT_FROM_ROOM = '[room] Disconnect from room';

export const connectToRoom = room => ({
	type: CONNECT_TO_ROOM,
	payload: room
});

export const disconnectFromRoom = room => ({
	type: DISCONNECT_FROM_ROOM,
	payload: room
});