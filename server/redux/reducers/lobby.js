import { 
  ADD_ROOM,
  UPDATE_ROOM,
  DESTROY_ROOM,
} from '../../../src/redux/actions/lobby';
import {
  ADD_MESSAGE,
} from '../../../src/redux/actions/room';
import roomReducer from './room';

const defaultState = {
  rooms: {},
}

const lobby = (state = defaultState, action) => {
  switch (action.type) {  
    case ADD_ROOM:
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.id]: action.payload,
        }
      };
    case DESTROY_ROOM: {
      const id = action.payload;
      let rooms = {...state.rooms};
      delete rooms[id];
      return {
        ...state,
        rooms,
      };
    }
    case ADD_MESSAGE: {
      const id = action.roomId;
      console.log('add message', id); 
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [id]: roomReducer(state.rooms[id], action),
        }
      }
    }
    default:
      return state;
  }
}

export default lobby;

