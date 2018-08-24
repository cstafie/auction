import { combineReducers } from 'redux';
import chat from './chat';
import user from './user';
import lobby from './lobby';
import room from './room';

export const rootReducer = combineReducers({
  chat,
  user,
  lobby,
  room,
});