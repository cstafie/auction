import { 
  ADD_ROOM,
  UPDATE_ROOM,
  DESTROY_ROOM,
} from '../actions/lobby';

const defaultState = {
  rooms: [],
}

const lobby = (state = defaultState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default lobby;

