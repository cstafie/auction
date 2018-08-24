export const SOCKET_RECEIVE = '[socket] Receive';
export const SEND_TO_LOBBY = '[socket] Send to Lobby';


export const socketReceive = action => ({
	type: SOCKET_RECEIVE,
	payload: action,
});

export const sendToLobby = action => ({
	type: SEND_TO_LOBBY,
	payload: action,
});