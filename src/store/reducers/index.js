import { combineReducers } from "redux";

import burgerBuilder from "./burgerBuilder";
import order from "./order";
import auth from "./auth";

const reducer = combineReducers({
	burgerBuilder: burgerBuilder,
	order: order,
	auth: auth
});

export default reducer;
