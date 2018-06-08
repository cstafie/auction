import React, { Component } from 'react';
import './App.css';
import Chat from './Chat';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Chat socket={this.props.io('http://192.168.0.8:3001')} />
      </div>
    );
  }
}

export default App;
