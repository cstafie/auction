import { RECEIVE_MESSAGE } from '../actions/chat';

const defaultState = {
  chat: [],
}

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        chat: [
          ...chat,
          action.payload
        ]
      };
    default:
      return state;
  }
}

export default chat;

