import { takeEvery } from "redux-saga/effects";

import {
	INITIATE_LOG_OUT,
	AUTH_INITIATE,
	CHECK_AUTH_STATUS
} from "store/actions/actionTypes";
import { logout, authenticate, checkAuthStatus } from "./auth";

export function* watchAuth() {
	yield takeEvery(INITIATE_LOG_OUT, logout);
	yield takeEvery(AUTH_INITIATE, authenticate);
	yield takeEvery(CHECK_AUTH_STATUS, checkAuthStatus);
}
