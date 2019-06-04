import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Burger, { BuildControls, OrderSummary } from "Components/Burger";
import { Spinner, Modal } from "Components/UI";
import withErrorHandler from "hoc/withErrorHandler";
import {
	addIngredient,
	removeIngredient,
	initIngredients
} from "store/actions";

import axios from "api";

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.initIngredients();
	}

	addIngredientHandler = type => {
		this.props.addIngredient(type);
	};

	removeIngredientHandler = type => {
		if (this.props.totalPrice <= 4) return;
		this.props.removeIngredient(type);
	};

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const { purchasing } = this.state;
		const { ingredients, totalPrice, error } = this.props;
		return (
			<Fragment>
				<Modal
					show={purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummary
						canceled={this.purchaseCancelHandler}
						continue={this.purchaseContinueHandler}
					/>
				</Modal>
				{error ? <p>{error}</p> : null}
				{!ingredients ? (
					<div
						style={{
							width: "100%",
							margin: "0 auto",
							display: "flex",
							height: "100vh",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Spinner />
					</div>
				) : (
					<Fragment>
						<Burger ingredients={ingredients} />
						<BuildControls
							addIngredient={this.addIngredientHandler}
							removeIngredient={this.removeIngredientHandler}
							price={totalPrice}
							ordered={this.purchaseHandler}
						/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	ingredients: state.burgerBuilder.ingredients,
	totalPrice: state.burgerBuilder.totalPrice,
	error: state.burgerBuilder.error
});

const mapDispatchToProps = dispatch => ({
	addIngredient: ingredient => dispatch(addIngredient(ingredient)),
	removeIngredient: ingredient => dispatch(removeIngredient(ingredient)),
	initIngredients: () => dispatch(initIngredients())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(withErrorHandler(BurgerBuilder, axios)));
