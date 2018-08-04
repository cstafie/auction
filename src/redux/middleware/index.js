import { userMdl } from './userMdl'
import { socketMdl } from './socketMdl';
import { chatMdl } from './chatMdl';
//import { routerMdl } from './routerMdl';

export const  middleware = [
	...socketMdl, 
	...chatMdl, 
	...userMdl,
]