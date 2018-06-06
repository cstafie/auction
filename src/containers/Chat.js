import React, { Component } from 'react';
import './Chat.css';

// TODO: cache user data for smooth reconnect?

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      message: '',
      messages: [],
    }
    //let socket = this.props.io('http://localhost:3001/');
    //socket.on('server-message', (msg) => console.log(msg));

    this.userNameHandleChange = this.userNameHandleChange.bind(this);
    this.submitUserName = this.submitUserName.bind(this);
    this.messageHandleChange = this.messageHandleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);

    this.props.socket.on('add-message', ({userName, color, message}) => {
      console.log(message);
      this.setState({
        messages: this.state.messages.concat([ 
          <div key={this.state.messages.length}> 
            {this.printUserName(userName, color)}: {message}
          </div> ])
      });
      console.log(`${color} ${userName} said ${message}`);
    })

    this.props.socket.on('user-joined', ({userName, color}) => {
      this.setState({
        messages: this.state.messages.concat([ 
          <div key={this.state.messages.length}> 
            {this.printUserName(userName, color)} has joined the chat 
          </div>])
      });
      console.log(`${color} ${userName} has joined the chat.`);
    });
  }

  printUserName(userName, color) {
    return <span style={{color}}> {userName} </span>;
  }

  submitUserName(event) {
    if (this.state.userName) {
      this.props.socket.emit('connect-user', this.state.userName, ({userId}) => {
        this.setState({userId});
      });
    }
    event.preventDefault();
  }

  userNameHandleChange(event) {
    this.setState({userName: event.target.value});
  }

  submitMessage(event) {
    if (this.state.message) {
      console.log('sending', this.state.message);
      this.props.socket.emit(
        'user-message', 
        {
          userId: this.state.userId, 
          message: this.state.message
        }
      );
      this.setState({message: ''});
    }
    event.preventDefault();
  }

  messageHandleChange(event) {
    this.setState({message: event.target.value})
  }

  ConnectUser() {
    return this.state.userId ? 
      <div> 
        {this.state.messages} 
        <form onSubmit={this.submitMessage}>
          <label>
            Message:
            <input 
              type="text" 
              value={this.state.message} 
              onChange={this.messageHandleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div> :
      <form onSubmit={this.submitUserName}>
        <label>
          Name:
          <input 
            type="text" 
            value={this.state.userName} 
            onChange={this.userNameHandleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>;
  } 

  // // <input type="button" value="Submit" onClick={this.submitUserName}/>
  
  render() {
    return this.ConnectUser();
  }
}

export default Chat;
