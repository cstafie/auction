import { applyMiddleware, createStore } from "redux";
import { reducers } from "./reducers";
import { socketMdl } from "./middleware/socket";
import { chatMdl } from ".middleware/chatMdl";

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
    	...socketMdl, 
    	...chatMdl, 
    	...usrMdl
  	),
  )
);