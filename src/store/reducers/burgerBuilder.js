import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS_FAILED,
	SET_INGREDIENTS_SUCCESS
} from "store/actions/actionTypes";

const INGREDIENT_PRICES = {
	salad: 0.3,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.2
};

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: null,
	building: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] + 1
				},
				totalPrice:
					state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				building: true
			};

		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] - 1
				},
				totalPrice:
					state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building: true
			};

		case SET_INGREDIENTS_SUCCESS:
			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: 4,
				building: false
			};

		case SET_INGREDIENTS_FAILED:
			return {
				...state,
				error: "Something went wrong"
			};

		default:
			return state;
	}
};
