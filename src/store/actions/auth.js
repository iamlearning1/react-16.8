import axios from "axios";

import {
	AUTH_START,
	AUTH_START_SUCCESS,
	AUTH_START_FAIL,
	LOG_OUT
} from "./actionTypes";

const authStart = () => ({
	type: AUTH_START
});

const authSuccess = payload => ({
	type: AUTH_START_SUCCESS,
	payload
});

const authFail = payload => ({
	type: AUTH_START_FAIL,
	payload
});

export const logout = () => ({
	type: LOG_OUT
});

export const auth = (email, password, requestType) => async dispatch => {
	dispatch(authStart());
	try {
		const body = {
			email,
			password,
			returnSecureToken: true
		};
		let type;
		if (requestType) {
			type = "signupNewUser?key=";
		} else {
			type = "verifyPassword?key=";
		}
		const { data } = await axios.post(
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/" +
				type +
				"AIzaSyCGNFhLMT4LQYKlvzIq0f2WuiXzdmofvew",
			body
		);
		dispatch(authSuccess(data));
	} catch (err) {
		dispatch(authFail(err));
	}
};
