import { combineReducers } from 'redux';
import chat from './chat';
import user from './user';

export const reducers = combineReducers({
  chat,
  user,
});