import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./actionTypes";

const INGREDIENT_PRICES = {
	salad: 0.3,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.2
};

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]:
						state.ingredients[action.ingredient] + 1
				},
				totalPrice:
					state.totalPrice + INGREDIENT_PRICES[action.ingredient]
			};

		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]:
						state.ingredients[action.ingredient] - 1
				},
				totalPrice:
					state.totalPrice - INGREDIENT_PRICES[action.ingredient]
			};

		default:
			return state;
	}
};
