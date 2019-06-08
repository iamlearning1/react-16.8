import {
	AUTH_START,
	AUTH_START_FAIL,
	AUTH_START_SUCCESS,
	LOG_OUT
} from "../actions/actionTypes";

const initalState = {
	authData: null,
	error: null,
	loading: false
};

export default (state = initalState, action) => {
	switch (action.type) {
		case AUTH_START:
			return {
				...state,
				loading: true
			};

		case AUTH_START_SUCCESS:
			return {
				...state,
				authData: action.payload,
				loading: false
			};

		case AUTH_START_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false
			};

		case LOG_OUT:
			return {
				...state,
				authData: null,
				error: null
			};
		default:
			return state;
	}
};
