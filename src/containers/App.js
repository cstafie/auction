import React, { Component } from 'react';
import Chat from './Chat';
import Input from '../components/Input';
import { connect } from 'react-redux';
import { connectUser, disconnectUser, handleSubmitUsername} from '../redux/actions/user';

class App extends Component {

	componentWillMount() {
		this.props.connectUser();
	}	

	componentWillUnmount() {
		this.props.disconnectUser();
	}

  render() {
    return (
      <div>
      	{this.props.user ? // this will eventually be replaced by a router
      		<Chat /> : // this will eventually change to game then lobby
      		<Input labelText='username'
      					 buttonText='join chat'
      					 handleSubmit={this.props.handleSubmitUsername} />
      	}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  connectUser, disconnectUser, handleSubmitUsername
})(App);
