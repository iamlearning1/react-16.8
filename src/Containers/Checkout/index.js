import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { CheckoutSummary } from "Components/Order";
import ContactData from "Containers/Checkout/ContactData";

const Checkout = props => {
	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinuedHandler = () => {
		props.history.replace("/checkout/contact-data");
	};

	return (
		<div>
			{props.ingredients && (
				<CheckoutSummary
					ingredients={props.ingredients}
					checkoutCancelled={checkoutCancelledHandler}
					checkoutContinued={checkoutContinuedHandler}
				/>
			)}
			<Route
				path={props.match.path + "/contact-data"}
				render={props => <ContactData {...props} />}
			/>
		</div>
	);
};

const mapStateToProps = state => ({
	ingredients: state.burgerBuilder.ingredients
});

export default connect(mapStateToProps)(withRouter(Checkout));
