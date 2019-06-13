import axios from "api";
import { put } from "redux-saga/effects";

import { setIngredients, setIngredientsFailed } from "store/actions";

export function* ingredients(action) {
	try {
		const { data } = yield axios.get("ingredients.json");
		yield put(setIngredients(data));
	} catch (err) {
		yield put(setIngredientsFailed(err));
	}
}
