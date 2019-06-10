import reducer from "./auth";
import { AUTH_START } from "store/actions/actionTypes";

const state = {
	authData: null,
	error: null,
	loading: false
};

describe("auth reducer", () => {
	it("should return the original state when wrong action type is passed", () => {
		expect(reducer(undefined, {})).toEqual({
			authData: null,
			error: null,
			loading: false
		});
	});

	it("should return turn loading to true when AUTH_START is passed", () => {
		expect(
			reducer(state, {
				type: AUTH_START
			})
		).toEqual({
			authData: null,
			error: null,
			loading: true
		});
	});
});
