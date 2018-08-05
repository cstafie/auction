import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { createRoom } from '../redux/actions/lobby';

const CreateChatRoom = ({createRoom}) =>
  <Input labelText='room name'
         buttonText='create room'
         handleSubmit={createRoom} />;


const Room = ({id, name, numUsers}) => 
	<tr key={id}>
    <td>{name}</td>
    <td>{numUsers}</td>
  </tr>;


const RoomList = ({rooms}) => {
	if (rooms.length === 0) {
		return <div> no chat rooms, go ahead and make one </div>;
	}

	return <table>
	 	<thead>
	    <tr>
	      <th>Name</th>
	      <th># Users</th>
	    </tr>
  	</thead>
    <tbody>
    	{rooms.map(Room)}
    </tbody>
	</table>
};



class Lobby extends Component {

	render() {
		return <div className='lobby'>
			<CreateChatRoom createRoom={this.props.createRoom} />
			<RoomList rooms={this.props.lobby.rooms} />
		</div>
	}
};

const mapStateToProps = state => ({
  lobby: state.lobby, // so that route changes on router change
});

export default connect(mapStateToProps, {
	createRoom
})(Lobby);