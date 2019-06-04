import { combineReducers } from "redux";

import burgerBuilderReducer from "./burgerBuilderReducer";
import order from "./order";

const reducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: order
});

export default reducer;
