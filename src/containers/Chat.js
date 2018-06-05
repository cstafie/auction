import React, { Component } from 'react';
import './Chat.css';

class Chat extends Component {

  constructor(props) {
    super(props);
    let socket = this.props.io('http://localhost:3001/');
    
    socket.on('server-message', (msg) => console.log(msg));
  }

  render() {
    return <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>;
  }
}

export default Chat;
