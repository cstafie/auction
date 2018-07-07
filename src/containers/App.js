import React, { Component } from 'react';
import './App.css';
import Chat from './Chat';
import { connect } from "react-redux";

class App extends Component {

	componentWillMount() {
		this.props.connectUser();
	}	

	componentWillUnmount() {
		this.props.disconnectUser();
	}

  render() {
    return (
      <div className="App">
      	<
        <Chat messages={this.props.messages}} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pending       : state.ui.pending,
  orderInProcess: state.ui.orderInProcess,
  books         : state.books,
  order         : state.order
});

export default connect(mapStateToProps, {
  userConnect, selectBook, submitOrder
})(App);
