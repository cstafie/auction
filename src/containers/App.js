import React, { Component } from 'react';
import { Route, Switch } from 'react-router' // react-router v4
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
    console.log('hello');
    return (
      <div>
        <Route exact path='/' component={() => Login(this.props)} />
        <Route path='/lobby' component={Lobby} />
      </div> 
    );
  }
};

const mapStateToProps = state => ({
  router: state.router, // so that route changes on router change
});

export default connect(mapStateToProps, {
  submitUsername, 
  connectToLobby,
})(App);
