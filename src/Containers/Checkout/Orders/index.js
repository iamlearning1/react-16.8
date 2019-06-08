import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Order from "Components/Order";
import { Spinner } from "Components/UI";

import axios from "api";
import withErrorHandler from "hoc/withErrorHandler";
import { fetchOrders } from "store/actions/";

class Orders extends Component {
	componentDidMount() {
		if (this.props.authData) {
			this.props.fetchOrders(this.props.authData.idToken);
		}
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
	fetchOrders: token => dispatch(fetchOrders(token))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(withErrorHandler(Orders, axios)));
