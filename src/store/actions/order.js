import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL,
	INIT_FETCH_ORDERS,
	INIT_PURCHASE_BURGER
} from "./actionTypes";

export const purchaseBurgerSuccess = id => ({
	type: PURCHASE_BURGER_SUCCESS,
	id
});

export const purchaseBurgerFail = () => ({
	type: PURCHASE_BURGER_FAIL
});

export const fetchOrdersSuccess = data => ({
	type: FETCH_ORDERS_SUCCESS,
	data
});

export const fetchOrdersFail = error => ({
	type: FETCH_ORDERS_FAIL,
	error
});

export const purchaseBurger = (orderData, userId, ingredients, totalPrice) => ({
	type: INIT_PURCHASE_BURGER,
	orderData,
	userId,
	ingredients,
	totalPrice
});

export const fetchOrders = userId => ({
	type: INIT_FETCH_ORDERS,
	userId
});
