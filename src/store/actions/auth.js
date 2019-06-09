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

const authSuccess = payload => {
	return { type: AUTH_START_SUCCESS, payload };
};

const authFail = payload => ({
	type: AUTH_START_FAIL,
	payload
});

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	return {
		type: LOG_OUT
	};
};

export const auth = (email, password, requestType) => async dispatch => {
	dispatch(authStart());
	try {
		const body = {
			email,
			password,
			returnSecureToken: true
		};
		let url;
		if (!requestType) {
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
				process.env.REACT_APP_API_KEY;
		} else {
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
				process.env.REACT_APP_API_KEY;
		}
		const { data } = await axios.post(url, body);
		const expirationDate = new Date(
			new Date().getTime() + data.expiresIn * 1000
		);
		localStorage.setItem("token", JSON.stringify(data.idToken));
		localStorage.setItem("expirationDate", JSON.stringify(expirationDate));

		dispatch(authSuccess(data));
	} catch (err) {
		dispatch(authFail(err));
	}
};

export const authStatus = () => async dispatch => {
	try {
		const token = JSON.parse(localStorage.getItem("token"));
		const expirationDate = new Date(
			JSON.parse(localStorage.getItem("expirationDate"))
		).getTime();
		const currentDate = new Date().getTime();
		if (!token) {
			dispatch(logout());
		} else {
			if (expirationDate <= currentDate) {
				dispatch(logout());
			} else {
				const {
					data: { users }
				} = await axios.post(
					"https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=" +
						process.env.REACT_APP_API_KEY,
					{
						idToken: token
					}
				);
				dispatch(authSuccess(users[0]));
			}
		}
	} catch (err) {
		dispatch(authFail(err));
	}
};
