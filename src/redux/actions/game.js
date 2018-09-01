export const REQUEST_SEAT = '[game] Player requested seat';
export const SIT_DOWN = '[game] Player sat down';
export const GAME_STARTED = '[game] Game started';
export const GAME_ENDED = '[game] Gamed ended';
export const GAME_PAUSED = '[game] Game paused';
export const GAME_UNPAUSED = '[game] Game unpaused';
export const PLAYER_ACTION = '[game] Player took action';
export const SET_GAME = '[game] Set Game';
export const UPDATE_GAME = '[game] Update Game';

export const requestSeat = username => ({
	type: REQUEST_SEAT,
	payload: username,
});

export const sitDown = username => ({
	type: SIT_DOWN,
	payload: username,
});

export const gameStarted = () => ({
	type: GAME_STARTED,
});

export const gameEnded = () => ({
	type: GAME_ENDED,
});

export const gamePaused = () => ({
	type: GAME_PAUSED,
});

export const gameUnpaused = () => ({
	type: GAME_UNPAUSED,
});

export const playerAction = action => ({
	type: PLAYER_ACTION,
	payload: action,
});

export const setGame = game => ({
	type: SET_GAME,
	payload: game,
});

export const updateGame = update => ({
	type: UPDATE_GAME,
	payload: update,
});



