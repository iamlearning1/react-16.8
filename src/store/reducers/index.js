import { combineReducers } from "redux";

import burgerBuilderReducer from "./burgerBuilderReducer";
import order from "./order";
import auth from "./auth";

const reducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: order,
	auth: auth
});

export default reducer;
