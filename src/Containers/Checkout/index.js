import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { CheckoutSummary } from "Components/Order";
import ContactData from "Containers/Checkout/ContactData";

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		return (
			<div>
				{this.props.ingredients && (
					<CheckoutSummary
						ingredients={this.props.ingredients}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
				)}
				<Route
					path={this.props.match.path + "/contact-data"}
					render={props => <ContactData {...props} />}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	ingredients: state.burgerBuilder.ingredients
});

export default connect(mapStateToProps)(withRouter(Checkout));
