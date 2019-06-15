import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Order from "Components/Order";
import { Spinner } from "Components/UI";

import axios from "api";
import withErrorHandler from "hoc/withErrorHandler";
import { fetchOrders } from "store/actions/";

const Orders = props => {
	const { orders, authData, fetchOrders } = props;

	useEffect(() => {
		if (authData) {
			fetchOrders(authData.localId);
		}
	}, [fetchOrders, authData]);

	const orderList = orders.map(order => (
		<Order
			price={order.price}
			ingredients={order.ingredients}
			key={order.id}
		/>
	));
	let orderData = <div>{!orders ? <Spinner /> : orderList}</div>;
	if (orders.length < 1) {
		orderData = (
			<p
				style={{
					display: "block",
					padding: "20px",
					margin: "0 auto",
					width: "100%"
				}}
			>
				No orders placed yet
			</p>
		);
	}
	return orderData;
};

const mapStateToProps = state => ({
	orders: state.order.data,
	authData: state.auth.authData
});

const mapDispatchToProps = dispatch => ({
	fetchOrders: userId => dispatch(fetchOrders(userId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(withErrorHandler(Orders, axios)));
