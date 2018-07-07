
const defaultState = {
  chat: [],
}

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
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

