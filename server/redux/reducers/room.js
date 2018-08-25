import {
  ADD_MESSAGE,
} from '../../../src/redux/actions/room';

const defaultState = {
	messages: [],
}

const room = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_MESSAGE: 

			console.log("WOWOWOWW", state);

			return {
				...state,
				messages: [
					...state.messages,
					action.payload,
				]
			}
		default:
			return state;
	}
}

export default room;