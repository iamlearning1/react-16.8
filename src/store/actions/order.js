import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL } from "./actionTypes";
import axios from "api";

const purchaseBurgerSuccess = id => ({
	type: PURCHASE_BURGER_SUCCESS,
	id
});

const purchaseBurgerFail = () => ({
	type: PURCHASE_BURGER_FAIL
});

export const purchaseBurger = orderData => async (dispatch, getState) => {
	const {
		burgerBuilder: { ingredients, totalPrice }
	} = getState();
	try {
		const { data } = await axios.post("/orders.json", {
			ingredients: ingredients,
			price: parseFloat(totalPrice).toFixed(2),
			orderData: orderData
		});
		dispatch(purchaseBurgerSuccess(data.name));
	} catch (error) {
		purchaseBurgerFail(error);
	}
};
