import {
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_SUCCESS,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL
} from "../actions/actionTypes";

const initialState = {
	error: null,
	id: null,
	data: []
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

		case FETCH_ORDERS_SUCCESS:
			return {
				...state,
				data: action.data
			};

		case FETCH_ORDERS_FAIL:
			return {
				...state,
				error: action.error
			};

		default:
			return state;
	}
};
