import { combineReducers } from 'redux';
import chat from './chat';
import user from './user';
import lobby from './lobby';

export const rootReducer = combineReducers({
  chat,
  user,
  lobby,
});