export const SEND_TO_ALL_IN_ROOM = '[room] Send to all in room';
export const SEND_TO_ROOM_SOCKET = '[room] Send to room socket';
export const CREATE_LOG_MESSAGE = '[room] Log message';

export const sendToAllInRoom = (roomChannel, action) => ({
	type: SEND_TO_ALL_IN_ROOM,
	payload: {roomChannel, action},
});

export const sendToRoomSocket = (socket, action) => ({
	type: SEND_TO_ROOM_SOCKET,
	payload: {socket, action},
});

export const createLogMessage = (message) => ({
	type: CREATE_LOG_MESSAGE,
	payload: message,
});
