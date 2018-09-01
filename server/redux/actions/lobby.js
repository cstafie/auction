export const START_LOBBY = '[lobby] Start lobby';
export const SEND_TO_ALL_IN_LOBBY = '[lobby] Send to all in lobby';
export const SEND_TO_LOBBY_SOCKET = '[lobby] Send to lobby socket';
export const SET_LOBBY_CHANNEL = '[lobby] Set lobby channel';

export const startLobby = (io) => ({
	type: START_LOBBY,
	payload: io,
});

export const setLobbyChannel = (channel) => ({
	type: SET_LOBBY_CHANNEL,
	payload: channel,
});

export const sendToAllInLobby = (action) => ({
	type: SEND_TO_ALL_IN_LOBBY,
	payload: action,
});

export const sendToLobbySocket = (socket, action) => ({
	type: SEND_TO_LOBBY_SOCKET,
	payload: {socket, action},
});

