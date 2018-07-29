import React, { Component } from 'react';
import Input from '../components/Input';
import { connect } from 'react-redux';
import { sendMessage } from '../redux/actions/chat';

const UserName = ({userName, color}) =>
  <span style={{color}}> {userName} </span>;

const Message = ({userName, color, message}) =>
  <div> <UserName userName={userName} color={color} /> {message} </div>

class Chat extends Component {

  render() {
    return (
      <div> 
        {this.props.messages.map((message, index) => 
          <Message key={index} {...message} /> )} 
        <Input buttonText='send'
               handleSubmit={this.props.sendMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.chat,
});

export default connect(mapStateToProps, {
  sendMessage
})(Chat);
