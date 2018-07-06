export const chatMessage = message => ({
  type: 'CHAT_MESSAGE',
  data: message,
});

export const receiveSocketMessage = socketMessage => ({
	type: 'RECEIVE_SOCKET_MESSAGE',
	data: socketMessage,
});

export const submitUserName

export { 
	chatMessage, 
	receiveSocketMessage 
};