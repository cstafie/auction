import { 
  SET_MESSAGES,
  ADD_MESSAGE,
  START_LOADING_ROOM,
  FINISH_LOADING_ROOM,
} from '../actions/room';

const defaultState = {
  loading: false,
  messages: [],
}

const room = (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADING_ROOM:
      return {
        ...state,
        loading: true,
      };
    case FINISH_LOADING_ROOM:
      return {
        ...state,
        loading: false,
      }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload,
        ],
      };
    case SET_MESSAGES: 
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}

export default room;

