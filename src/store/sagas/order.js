import axios from "api";
import { put } from "redux-saga/effects";

import {
	purchaseBurgerFail,
	purchaseBurgerSuccess,
	fetchOrdersSuccess,
	fetchOrdersFail
} from "store/actions";

export function* purchase(action) {
	const { ingredients, totalPrice, orderData, userId } = action;
	const body = {
		ingredients,
		price: parseFloat(totalPrice).toFixed(2),
		orderData,
		userId
	};
	const token = JSON.parse(localStorage.getItem("token"));

	try {
		const { data } = yield axios.post("/orders.json?auth=" + token, body);
		yield put(purchaseBurgerSuccess(data.name));
	} catch (error) {
		yield put(purchaseBurgerFail(error));
	}
}

export function* fetchOrders(action) {
	const dataArray = [];
	const queryParams = `&orderBy="userId"&equalTo="${action.userId}"`;
	const token = JSON.parse(localStorage.getItem("token"));

	try {
		const { data } = yield axios.get(
			`/orders.json?auth=${token}${queryParams}`
		);
		for (let i in data) {
			dataArray.push({
				...data[i],
				id: i
			});
		}
		yield put(fetchOrdersSuccess(dataArray));
	} catch (error) {
		yield put(fetchOrdersFail(error));
	}
}
