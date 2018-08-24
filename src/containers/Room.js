import React, { Component } from 'react';
import Chat from '../containers/Chat';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { 
  connectToRoom,
  disconnectFromRoom,
  createMessage,
} from '../redux/actions/room';

const RoomNotFound = ({push}) => 
  <div> 
    <div> This room does not exist </div>
    <button onClick={() => push('/lobby')}> Back to lobby </button>
  </div>;


class Room extends Component {

	componentWillMount() {
    let roomId = this.props.match.params.id;
    let room = this.props.rooms[roomId];
    this.setState({room});
    if (room) {
      this.props.connectToRoom(room);
    }
	}	

  render() {
    if (!this.state.room) {
      return <RoomNotFound push={this.props.push} />
    } else if (this.props.room.loading) {
      return <Spinner />
    }

    return (
      <div>
        <div> Welcome to room {this.state.room.name} </div>
        <Chat 
          messages={this.props.room.messages}
          createMessage={this.props.createMessage} />
      </div>
    );
  }

  componentWillUnmount() {
    if (this.state.room) {
      this.props.disconnectFromRoom(this.state.room);
    }
  }
};

const mapStateToProps = state => ({
  rooms: state.lobby.rooms,
  room: state.room,
});

export default connect(mapStateToProps, {
  push,
  connectToRoom,
  disconnectFromRoom,
  createMessage,
})(Room);
