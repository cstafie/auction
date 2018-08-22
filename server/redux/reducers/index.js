import { combineReducers } from 'redux';
import chat from './chat';
import lobby from '../../../src/redux/reducers/lobby';

export const reducers = combineReducers({
  lobby,
});