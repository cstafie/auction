import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // TODO: why not use my own router with redux?
import Lobby from './Lobby';
import Input from '../components/Input';
import { connect } from 'react-redux';
import { submitUsername } from '../redux/actions/user';
import { connectToLobby } from '../redux/actions/socket';

const Login = ({submitUsername}) =>
  <Input labelText='username'
         buttonText='join lobby'
         handleSubmit={submitUsername} />;

class App extends Component {

	componentWillMount() {
		this.props.connectToLobby();
	}	

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={() => Login(this.props)} />
          <Route path='/lobby' component={Lobby} />
        </div> 
      </Router>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  submitUsername, 
  connectToLobby,
})(App);
