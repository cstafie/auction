import React, { Component } from 'react';
import './Chat.css';

// TODO: cache user data for smooth reconnect?

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    }
    //let socket = this.props.io('http://localhost:3001/');
    //socket.on('server-message', (msg) => console.log(msg));

    this.userNameHandleChange = this.userNameHandleChange.bind(this);
    this.submitUserName = this.submitUserName.bind(this);

    this.props.socket.on('new-user', ({userName, color}) => {
      console.log(`${color} ${userName} has joined the chat.`);
    });
  }

  submitUserName(event) {
    if (this.state.userName) {
      this.props.socket.emit('connect-user', this.state.userName, (response) => {
        console.log('response', response);
      });
    }
    event.preventDefault();
  }

  userNameHandleChange(event) {
    this.setState({userName: event.target.value});
  }

  ConnectUser() {
    return <form onSubmit={this.submitUserName}>
      <label>
        Name:
        <input 
          type="text" 
          value={this.state.userName} 
          onChange={this.userNameHandleChange} />
      </label>
      <input type="submit" value="Submit"/>
    </form>
  } 

  // // <input type="button" value="Submit" onClick={this.submitUserName}/>
  
  render() {
    return this.ConnectUser();
  }
}

export default Chat;
