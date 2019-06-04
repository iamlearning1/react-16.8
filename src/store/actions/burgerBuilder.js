import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS,
	SET_INGREDIENTS_FAILED
} from "./actionTypes";
import axios from "api";

export const addIngredient = ingredientName => ({
	type: ADD_INGREDIENT,
	ingredientName
});

export const removeIngredient = ingredientName => ({
	type: REMOVE_INGREDIENT,
	ingredientName
});

const setIngredients = ingredients => ({
	type: SET_INGREDIENTS,
	ingredients
});

const setIngredientsFailed = () => ({
	type: SET_INGREDIENTS_FAILED
});

export const initIngredients = () => async dispatch => {
	try {
		const { data } = await axios.get("ingredients.json");
		dispatch(setIngredients(data));
	} catch (error) {
		dispatch(setIngredientsFailed());
	}
};
