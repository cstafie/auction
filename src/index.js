import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App.js';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import middleware from './middleware';


const store = createStore(rootReducer,
	applyMiddelware(...middleware));

ReactDOM.render(
	<Provider store={store}>
		<App io={io}/>
	</Provider>, 
	document.getElementById('root'));

registerServiceWorker();
