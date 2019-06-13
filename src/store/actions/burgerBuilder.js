import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS_SUCCESS,
	SET_INGREDIENTS_FAILED,
	INIT_INGREDIENTS
} from "./actionTypes";

export const addIngredient = ingredientName => ({
	type: ADD_INGREDIENT,
	ingredientName
});

export const removeIngredient = ingredientName => ({
	type: REMOVE_INGREDIENT,
	ingredientName
});

export const setIngredients = ingredients => ({
	type: SET_INGREDIENTS_SUCCESS,
	ingredients
});

export const setIngredientsFailed = () => ({
	type: SET_INGREDIENTS_FAILED
});

export const initIngredients = () => ({
	type: INIT_INGREDIENTS
});
