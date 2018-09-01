import {
	REQUEST_SEAT,
	SIT_DOWN,
	GAME_STARTED,
	GAME_ENDED,
	GAME_PAUSED,
	GAME_UNPAUSED,
	PLAYER_ACTION,
	SET_GAME,
	UPDATE_GAME,
}	from '../../../src/redux/actions/game';

const game = ({dispatch, getState}, next, action) => {

	// if (action.type === REQUEST_SEAT) {
	// 	let room = getState().lobby.rooms[action.roomId].
	// }
};

export const gameMdl = [game];