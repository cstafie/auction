// import { ROUTE_ACTIONS, CHANGE_ROUTE, changeRoute, routeToLobby} from '../actions/router';
// import { SUBMIT_USERNAME } from '../actions/user';

// const router = ({ dispatch }) => next => action => {
// 	next(action);

// 	if (ROUTE_ACTIONS.hasOwnProperty(action.type)) {
// 		console.log(action.payload);
// 		dispatch(changeRoute(action.payload));
// 	} else if (action.type === SUBMIT_USERNAME) {
// 		dispatch(routeToLobby());
// 	} else if (action.type === CHANGE_ROUTE) {
// 		window.history.pushState('', '', action.payload); // TODO: clean up https://stackoverflow.com/questions/3338642/updating-address-bar-with-new-url-without-hash-or-reloading-the-page
// 		//window.location = action.payload;
// 	}
// };

// export const routerMdl = [router];