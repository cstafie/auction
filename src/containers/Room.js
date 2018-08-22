import React, { Component } from 'react';
import Chat from '../containers/Chat';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { connectToRoom } from '../redux/actions/room';

const RoomNotFound = ({push}) => 
<div> 
    <div> This room does not currently exist </div>
    <button onClick={() => push('/lobby')}> Back to lobby </button>
  </div>;


class Room extends Component {

	componentWillMount() {
    let roomId = this.props.match.params.id;
    let room = this.props.rooms[roomId];
    this.setState({room});
		this.props.connectToRoom(room);
	}	

  render() {
    if (!this.state.room) {
      return <RoomNotFound push={this.props.push} />
    }

    return (
      <div>
        <div> Welcome to room {this.state.room.id} </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  rooms: state.lobby.rooms,
});

export default connect(mapStateToProps, {
  push,
  connectToRoom
})(Room);
