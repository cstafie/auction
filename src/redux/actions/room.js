export const CONNECT_TO_ROOM = '[room] Connect to room';

export const connectToRoom = room => ({
	type: CONNECT_TO_ROOM,
	payload: room
});
