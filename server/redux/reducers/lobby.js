import { RECEIVE_MESSAGE } from '../actions/chat';

const defaultState = {
  chat: [],
}

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return {
        ...state,
        chat: [
          ...chat,
          action.data
        ]
      };
    default:
      return state;
  }
}

export default chat;
