import {
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_SUCCESS
} from "../actions/actionTypes";

const initialState = {
	error: null,
	id: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PURCHASE_BURGER_SUCCESS:
			return {
				...state,
				id: action.id
			};

		case PURCHASE_BURGER_FAIL:
			return {
				...state,
				error: "Something went wrong"
			};

		default:
			return state;
	}
};
