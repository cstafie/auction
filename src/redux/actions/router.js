export const CHANGE_ROUTE = '[router] Change route';
const ROUTE_TO_LOBBY = '[router] Route to Lobby';

const BASE_ROUTE = 'http://localhost:3000/';
const LOBBY_ROUTE = BASE_ROUTE + 'lobby';

export const routeToLobby = () => ({ 
	type: ROUTE_TO_LOBBY, 
	payload: LOBBY_ROUTE,
});

export const changeRoute = (route) => ({
	type: CHANGE_ROUTE,
	payload: route,
});

export const ROUTE_ACTIONS = {
	[ROUTE_TO_LOBBY]: ROUTE_TO_LOBBY,
}




