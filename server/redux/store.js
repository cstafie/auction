const { applyMiddleware, createStore } = require('redux');
import { reducers } from './reducers';
import { usersMdl } from './middleware/userMdl'
import { socketMdl } from './middleware/socketMdl';
import { chatMdl } from './middleware/chatMdl';

export const store = createStore(
  reducers,
  applyMiddleware(
  	...socketMdl, 
  	...chatMdl, 
  	...usersMdl
	),
);