import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Spinner from '../components/Spinner';
import { createRoom } from '../redux/actions/lobby';
import { push } from 'connected-react-router';

const CreateChatRoom = ({createRoom}) =>
  <Input labelText='room name'
         buttonText='create room'
         handleSubmit={createRoom} />;

const Room = ({id, name, numUsers, push}) => 
	<tr>
    <td>{name}</td>
    <td>{numUsers}</td>
    <td> 
    	<button onClick={() => push(`/room${id}`)}> 
    		join 
			</button> 
		</td>
  </tr>;

const RoomList = ({rooms, push}) => {
	if (rooms.length === 0) {
		return <div className='room-list'> no chat rooms, go ahead and make one </div>;
	}

	return <table className='room-list'>
	 	<thead>
	    <tr>
	      <th>Name</th>
	      <th># Users</th>
	      <th></th>
	    </tr>
  	</thead>
    <tbody>
    	{rooms.map(room => <Room key={room.id} {...room} push={push} />)}
    </tbody>
	</table>
};

class Lobby extends Component {

	render() {	

		if (this.props.lobby.loading) {
			return <Spinner />
		}

		return <div className='lobby'>
			<RoomList rooms={Object.values(this.props.lobby.rooms)} push={this.props.push} />
			<CreateChatRoom createRoom={this.props.createRoom} />
		</div>
	}
};

const mapStateToProps = state => ({
  lobby: state.lobby, // so that route changes on router change
});

export default connect(mapStateToProps, {
	createRoom,
	push,
})(Lobby);