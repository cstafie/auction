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

const WAITING_FOR_PLAYERS = 'Waiting for players';
const AUCTION = 'Auction';
const TRUMP_SELECTION = 'Trump selection';
const PLAYING_ROUND = 'Playing round';
const PAUSED = 'Paused';
const CONCLUDED = 'Concluded';

const defaultState = {
	players: new Map(),
	state: WAITING_FOR_PLAYERS,
};

const game = (state = defaultState, action) => {
	switch (action.type) {
		case SIT_DOWN: 

			return { // TODO: implement
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

export default game;