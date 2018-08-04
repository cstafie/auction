export const SOCKET_RECEIVE = '[socket] Receive';
export const SOCKET_SEND = '[socket] Send';
export const CONNECT_TO_LOBBY = '[socket] Connect to lobby';

export const connectToLobby = action => ({
	type: CONNECT_TO_LOBBY,
});

export const socketReceive = action => ({
	type: SOCKET_RECEIVE,
	payload: action,
});

export const socketSend = action => ({
	type: SOCKET_SEND,
	payload: action,
});