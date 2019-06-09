import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./index";
import NavigationItem from "./NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it("should render two navigation items if user is not authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should render three navigation items if user is authenticated", () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it("should render have logout navigation item if user is authenticated", () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(
			wrapper.contains(
				<NavigationItem link="/logout">LOGOUT</NavigationItem>
			)
		).toEqual(true);
	});
});
