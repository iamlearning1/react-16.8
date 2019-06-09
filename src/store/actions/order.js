import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL
} from "./actionTypes";
import axios from "api";

const purchaseBurgerSuccess = id => ({
	type: PURCHASE_BURGER_SUCCESS,
	id
});

const purchaseBurgerFail = () => ({
	type: PURCHASE_BURGER_FAIL
});

const fetchOrdersSuccess = data => ({
	type: FETCH_ORDERS_SUCCESS,
	data
});

const fetchOrdersFail = error => ({
	type: FETCH_ORDERS_FAIL,
	error
});

export const purchaseBurger = (orderData, userId) => async (
	dispatch,
	getState
) => {
	const {
		burgerBuilder: { ingredients, totalPrice }
	} = getState();
	try {
		const { data } = await axios.post(
			"/orders.json?auth=" + JSON.parse(localStorage.getItem("token")),
			{
				ingredients: ingredients,
				price: parseFloat(totalPrice).toFixed(2),
				orderData: orderData,
				userId
			}
		);
		dispatch(purchaseBurgerSuccess(data.name));
	} catch (error) {
		purchaseBurgerFail(error);
	}
};

export const fetchOrders = userId => async dispatch => {
	try {
		const dataArray = [];
		const queryParams = `&orderBy="userId"&equalTo="${userId}"`;
		const token = JSON.parse(localStorage.getItem("token"));
		const { data } = await axios.get(
			`/orders.json?auth=${token}${queryParams}`
		);
		for (let i in data) {
			dataArray.push({
				...data[i],
				id: i
			});
		}
		dispatch(fetchOrdersSuccess(dataArray));
	} catch (error) {
		dispatch(fetchOrdersFail(error));
	}
};
