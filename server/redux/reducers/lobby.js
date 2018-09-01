import { 
  ADD_ROOM,
  UPDATE_ROOM,
  DESTROY_ROOM,
} from '../../../src/redux/actions/lobby';
import {
  START_LOBBY,
  SET_LOBBY_CHANNEL,
} from '../actions/lobby';
import {
  ADD_MESSAGE,
} from '../../../src/redux/actions/room';
import roomReducer from './room';

const defaultState = {
  io: undefined,
  channel: undefined,
  rooms: {},
};

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
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [id]: roomReducer(state.rooms[id], action),
        }
      }
    }
    case SET_LOBBY_CHANNEL: {
      return {
        ...state,
        channel: action.payload,
      }
    }
    case START_LOBBY: {
      return {
        ...state,
        io: action.payload,
      }
    }
    default:
      return state;
  }
};

export default lobby;

