import { takeEvery } from "redux-saga/effects";

import {
	INITIATE_LOG_OUT,
	AUTH_INITIATE,
	CHECK_AUTH_STATUS,
	INIT_INGREDIENTS,
	INIT_FETCH_ORDERS,
	INIT_PURCHASE_BURGER
} from "store/actions/actionTypes";
import { logout, authenticate, checkAuthStatus } from "./auth";
import { ingredients } from "./ingredients";
import { fetchOrders, purchase } from "./order";

export function* watchAuth() {
	yield takeEvery(INITIATE_LOG_OUT, logout);
	yield takeEvery(AUTH_INITIATE, authenticate);
	yield takeEvery(CHECK_AUTH_STATUS, checkAuthStatus);
}

export function* loadIngredients() {
	yield takeEvery(INIT_INGREDIENTS, ingredients);
}

export function* orders() {
	yield takeEvery(INIT_PURCHASE_BURGER, purchase);
	yield takeEvery(INIT_FETCH_ORDERS, fetchOrders);
}
