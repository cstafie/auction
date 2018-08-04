import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { rootReducer } from './reducers';
import { middleware } from './middleware';

export const history = createBrowserHistory(); 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(applyMiddleware(
  	routerMiddleware(history),
  	...middleware)),
);