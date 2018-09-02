import {
  ADD_MESSAGE,
} from '../../../src/redux/actions/room';

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
} from '../../../src/redux/actions/game';

import gameReducer from './game';

const defaultState = {
	messages: [],
	game: gameReducer(),
};

const room = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_MESSAGE: 

			return {
				...state,
				messages: [
					...state.messages,
					action.payload,
				],
			}
		default:
			return state;
	}
};

export default room;