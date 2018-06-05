import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App.js';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';

ReactDOM.render(<App io={io}/>, document.getElementById('root'));
registerServiceWorker();
