import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Lobby from './Lobby';
import Input from '../components/Input';
import Room from './Room';
import { connect } from 'react-redux';
import { submitUsername } from '../redux/actions/user';
import { connectToLobby } from '../redux/actions/lobby';

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
      <div className='app'>
        <Switch>
          <Route exact path='/' component={() => Login(this.props)} />
          <Route path='/lobby' component={Lobby} />
          <Route path='/room:id' component={Room} />
        </Switch> 
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
