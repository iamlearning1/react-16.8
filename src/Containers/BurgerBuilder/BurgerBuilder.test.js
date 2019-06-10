import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./index";
import { BuildControls } from "Components/Burger";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
	});

	it("should not render build controls when ingredients do not exist", () => {
		wrapper.setProps({ ingredients: null });
		expect(wrapper.find(BuildControls)).toHaveLength(0);
	});

	it("should render build controls when ingredients exist", () => {
		wrapper.setProps({
			ingredients: { salad: 0, cheese: 0, meat: 0, bacon: 1 }
		});
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
