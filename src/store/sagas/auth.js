import { put, call } from "redux-saga/effects";
import axios from "axios";

import { logoutSuccess, authStart, authSuccess, authFail } from "store/actions";

export function* logout(action) {
	yield call([localStorage, "removeItem"], "token");
	yield call([localStorage, "removeItem"], "expirationDate");
	yield put(logoutSuccess());
}

export function* authenticate(action) {
	yield put(authStart());
	let url;
	const body = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	if (!action.requestType) {
		url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
			process.env.REACT_APP_API_KEY;
	} else {
		url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
			process.env.REACT_APP_API_KEY;
	}
	try {
		const { data } = yield axios.post(url, body);
		const expirationDate = new Date(
			new Date().getTime() + data.expiresIn * 1000
		);
		yield localStorage.setItem("token", JSON.stringify(data.idToken));
		yield localStorage.setItem(
			"expirationDate",
			JSON.stringify(expirationDate)
		);
		yield put(authSuccess(data));
	} catch (err) {
		yield put(authFail(err));
	}
}

export function* checkAuthStatus(action) {
	const token = yield JSON.parse(localStorage.getItem("token"));
	const expirationDate = yield new Date(
		JSON.parse(localStorage.getItem("expirationDate"))
	).getTime();
	const currentDate = yield new Date().getTime();
	try {
		if (!token) {
			yield put(logoutSuccess());
		} else {
			if (expirationDate <= currentDate) {
				yield put(logoutSuccess());
			} else {
				const {
					data: { users }
				} = yield axios.post(
					"https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=" +
						process.env.REACT_APP_API_KEY,
					{
						idToken: token
					}
				);
				yield put(authSuccess(users[0]));
			}
		}
	} catch (err) {
		yield put(authFail(err));
	}
}
