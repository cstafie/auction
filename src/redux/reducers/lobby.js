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
  rooms: [],
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
      return {
        ...state,
        rooms: [
          ...state.rooms,
          action.payload
        ]
      };
    case UPDATE_ROOM:
      let room = action.payload;
      return {
        ...state,
        rooms: [
          ...state.rooms.slice(0, room.id),
          room,
          ...state.rooms.slice(room.id + 1),
        ]
      };
    case DESTROY_ROOM:
      let id = action.payload;
      return {
        ...state,
        rooms: [
          ...state.rooms.slice(0,id),
          ...state.rooms.slice(id + 1),
        ]
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

