import React, { Component } from "react";

import Order from "Components/Order";
import { Spinner } from "Components/UI";

import axios from "api";
import withErrorHandler from "hoc/withErrorHandler";

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	async componentDidMount() {
		try {
			const dataArray = [];
			const { data } = await axios.get("/orders.json");
			for (let i in data) {
				dataArray.push({
					...data[i],
					id: i
				});
			}
			this.setState({
				orders: dataArray,
				loading: false
			});
		} catch (error) {
			this.setState({
				loading: false
			});
		}
	}

	render() {
		const { loading, orders } = this.state;
		const orderList = orders.map(order => (
			<Order
				price={order.price}
				ingredients={order.ingredients}
				key={order.id}
			/>
		));
		return <div>{loading ? <Spinner /> : orderList}</div>;
	}
}

export default withErrorHandler(Orders, axios);
