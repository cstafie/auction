import { SUBMIT_USERNAME } from '../actions/user';

const defaultState = {
  user: {},
}

const user = (state = defaultState, action) => {
  switch (action.type) {
    case SUBMIT_USERNAME:
      return {
        ...state,
        user: Object.assign({}, ...user, { username: action.payload }),
      };
    default:
      return state;
  }
}

export default user;