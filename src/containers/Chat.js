import React  from 'react';
import Input from '../components/Input';
// import { connect } from 'react-redux';

const Username = ({username}) =>
  <span style={{color: 'purple'}}> {username} </span>;

const Message = ({username, message}) =>
  <div> <Username username={username}/> {message} </div>

const Chat = ({messages, createMessage}) =>
  <div> 
    {messages.map((message, index) => <Message key={index} {...message} />)} 
    <Input 
      buttonText='Send'
      handleSubmit={createMessage} />
  </div>

export default Chat;
// class Chat extends Component {

//   render() {
//     return (
      
//     );
//   }
// }

// // const mapStateToProps = state => ({
// //   messages: state.chat,
// // });

// // export default connect(mapStateToProps, {
// //   sendMessage
// })(Chat);
