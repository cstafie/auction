import { combineReducers } from 'redux';
import lobby from './lobby';
import users from './users'

export const reducers = combineReducers({
  lobby,
  users, 
});

