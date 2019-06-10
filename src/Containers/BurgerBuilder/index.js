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

export class BurgerBuilder extends Component {
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
		if (this.props.authData) {
			this.setState({
				purchasing: true
			});
		} else {
			this.props.history.push("/auth");
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const { purchasing } = this.state;
		const { ingredients, totalPrice, error, authData } = this.props;
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
					<Spinner />
				) : (
					<Fragment>
						<Burger ingredients={ingredients} />
						<BuildControls
							addIngredient={this.addIngredientHandler}
							removeIngredient={this.removeIngredientHandler}
							price={totalPrice}
							ordered={this.purchaseHandler}
							authData={authData}
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
	error: state.burgerBuilder.error,
	authData: state.auth.authData
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
