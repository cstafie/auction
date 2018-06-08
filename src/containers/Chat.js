import React, { Component } from 'react';
import './Chat.css';

let ChatBox = ({message, messages, submitMessage, messageHandleChange}) => 
  <div style={{textAlign: 'left'}}> 
    {messages} 
    <form onSubmit={submitMessage}>
      <label>
        <input 
          type="text" 
          value={message} 
          onChange={messageHandleChange} />
      </label>
      <input type="submit" value="Send"/>
    </form>
  </div>;

let UserNameForm = ({userName, submitUserName, userNameHandleChange}) => 
  <form onSubmit={submitUserName}>
    <label>
      Name
      <input 
        type="text" 
        value={userName} 
        onChange={userNameHandleChange} />
    </label>
    <input type="submit" value="Join Chat"/>
  </form>;  

let UserName = ({userName, color}) =>
  <span style={{color}}> {userName} </span>;

let Message = ({userName, color, message}) =>
  <div> <UserName userName={userName} color={color} /> {message} </div>

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      message: '',
      messages: [],
    }
  }

  // once you have a user name you can listen for messages
  handleSocketOn(id, data) {
    console.log(id, data);
    switch(id) {
      case 'message': 
        this.setState({
          messages: this.state.messages.concat([
            <Message key={this.state.messages.length} {...data} /> ])
        });
        break;
      default:
        break;
    }
  }

  submitUserName(event) {
    if (this.state.userName) {
      this.props.socket.emit('connect-user', this.state.userName, ({userId}) => {
        this.props.socket.on('message', this.handleSocketOn.bind(this, 'message'));
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
  
  render() {
    return this.state.userId ? 
      <ChatBox message={this.state.message}
               messages={this.state.messages}
               submitMessage={this.submitMessage.bind(this)}
               messageHandleChange={this.messageHandleChange.bind(this)} /> :
      <UserNameForm userName={this.userName}
                    submitUserName={this.submitUserName.bind(this)}
                    userNameHandleChange={this.userNameHandleChange.bind(this)} />      
  }
}

export default Chat;
