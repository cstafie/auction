import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
// import { usersMdl } from './middleware/usersMdl'
//import { socketMdl } from './middleware/socketMdl';
// import { chatMdl } from './middleware/chatMdl';
import { lobbyMdl } from './middleware/lobbyMdl';
import { roomMdl } from './middleware/roomMdl';

export const store = createStore(
  reducers,
  applyMiddleware(
  	...lobbyMdl,
  	...roomMdl,
	),
);