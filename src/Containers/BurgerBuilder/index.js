import React, { Component, Fragment } from "react";

import Burger from "../../Components/Burger";
import BuildControls from "../../Components/Burger/BuildControls";

const INGREDIENT_PRICES = {
	salad: 0.3,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1.2
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	};

	addIngredientHandler = type => {
		const updatedCount = this.state.ingredients[type] + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice
		});
	};

	removeIngredientHandler = type => {
		let updatedCount = this.state.ingredients[type] - 1;
		if (updatedCount === -1) {
			return;
		}
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice
		});
	};

	render() {
		const { ingredients, totalPrice } = this.state;
		return (
			<Fragment>
				<Burger ingredients={ingredients} />
				<BuildControls
					addIngredient={this.addIngredientHandler}
					removeIngredient={this.removeIngredientHandler}
					price={totalPrice}
				/>
			</Fragment>
		);
	}
}

export default BurgerBuilder;
