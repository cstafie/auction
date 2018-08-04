import { SOCKET_RECEIVE, SOCKET_SEND, socketReceive} from '../actions/socket';
import { CONNECT_USER } from '../actions/users';
import { emitSocketAction } from '../../main';

const socketDecapsulator = ({dispatch}) => next => action => {
  next(action);

 	if (action.type === SOCKET_RECEIVE) {
 		dispatch(action.payload); 
 	}
}

const socketEncapsulator = ({dispatch}) => next => action => {
  next(action);
  
  if (action.type === SOCKET_SEND) { 
  	emitSocketAction(action.paylod);
  }
};

export const socketMdl = [socketDecapsulator, socketEncapsulator];