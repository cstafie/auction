import { 
  // REQUEST_SEAT,
  // SIT_DOWN,
  // GAME_STARTED,
  // GAME_ENDED,
  // GAME_PAUSED,
  // GAME_UNPAUSED,
  // PLAYER_ACTION,
  SET_GAME,
  UPDATE_GAME,
} from '../actions/game';

const defaultState = {
  players: [],
  state: '',
}

const game = (state = defaultState, action={}) => {
  switch (action.type) {
    case SET_GAME:
    case UPDATE_GAME:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}

export default game;

