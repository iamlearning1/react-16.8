import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "Components/Order";
import { Spinner } from "Components/UI";

import axios from "api";
import withErrorHandler from "hoc/withErrorHandler";
import { fetchOrders } from "store/actions/";

class Orders extends Component {
	componentDidMount() {
		this.props.fetchOrders();
	}

	render() {
		const { orders } = this.props;
		const orderList = orders.map(order => (
			<Order
				price={order.price}
				ingredients={order.ingredients}
				key={order.id}
			/>
		));
		return <div>{orders.length < 1 ? <Spinner /> : orderList}</div>;
	}
}

const mapStateToProps = state => ({
	orders: state.order.data
});

const mapDispatchToProps = dispatch => ({
	fetchOrders: () => dispatch(fetchOrders())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
