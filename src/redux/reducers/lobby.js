import { 
  ADD_ROOM,
  UPDATE_ROOM,
  DESTROY_ROOM,
  SET_ROOMS,
  START_LOADING_LOBBY,
  FINISH_LOADING_LOBBY
} from '../actions/lobby';

const defaultState = {
  loading: false,
  rooms: {},
}

const lobby = (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADING_LOBBY:
      return {
        ...state,
        loading: true,
      };
    case FINISH_LOADING_LOBBY:
      return {
        ...state,
        loading: false,
      }
    case ADD_ROOM:
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.id]: action.payload,
        }
      };
    case DESTROY_ROOM:
      const id = action.payload;
      let rooms = {...state.rooms};
      delete rooms[id];
      return {
        ...state,
        rooms,
      };
    case SET_ROOMS: 
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
}

export default lobby;

