import {
	AUTH_START,
	AUTH_START_SUCCESS,
	AUTH_START_FAIL,
	INITIATE_LOG_OUT,
	LOG_OUT,
	AUTH_INITIATE,
	CHECK_AUTH_STATUS
} from "./actionTypes";

export const authStart = () => ({
	type: AUTH_START
});

export const authSuccess = payload => {
	return { type: AUTH_START_SUCCESS, payload };
};

export const authFail = payload => ({
	type: AUTH_START_FAIL,
	payload
});

export const logout = () => ({
	type: INITIATE_LOG_OUT
});

export const logoutSuccess = () => ({
	type: LOG_OUT
});

export const auth = (email, password, requestType) => ({
	type: AUTH_INITIATE,
	email,
	password,
	requestType
});

export const authStatus = () => ({
	type: CHECK_AUTH_STATUS
});
