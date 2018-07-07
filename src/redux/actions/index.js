export const chatMessage = message => ({
  type: 'CHAT_MESSAGE',
  data: message,
});

export const receiveSocketMessage = socketMessage => ({
	type: 'RECEIVE_SOCKET_MESSAGE',
	data: socketMessage,
});

export const submitUserName = userName => ({
	type: 'SUBMIT_USER_NAME',
	data: userName,
});

export { 
	chatMessage, 
	receiveSocketMessage 
};