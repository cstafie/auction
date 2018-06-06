import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import Chat from './Chat';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Chat socket={this.props.io('http://192.168.0.8:3001')} />
      </div>
    );
  }
}

export default App;
