export const SOCKET_RECEIVE = '[socket] Receive';
export const SOCKET_SEND = '[socket] Send';


export const socketReceive = action => ({
	type: SOCKET_RECEIVE,
	payload: action,
});

export const socketSend = action => ({
	type: SOCKET_SEND,
	payload: action,
});