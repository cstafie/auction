import { SUBMIT_USERNAME } from '../actions/user';

const defaultState = {};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case SUBMIT_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
}

export default user;