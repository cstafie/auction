import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
// import { usersMdl } from './middleware/usersMdl'
//import { socketMdl } from './middleware/socketMdl';
// import { chatMdl } from './middleware/chatMdl';
import { lobbyMdl } from './middleware/lobbyMdl';
import { roomMdl } from './middleware/roomMdl';
import { loggingMdl } from './middleware/loggingMdl';
import { usersMdl } from './middleware/usersMdl';
import { gameMdl } from './middleware/gameMdl';

export const store = createStore(
  reducers,
  applyMiddleware(
  	...loggingMdl,
  	...lobbyMdl,
  	...roomMdl,
  	...usersMdl,
  	...gameMdl,
	),
);