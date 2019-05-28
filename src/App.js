import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Layout from "Components/Layout";
import BurgerBuilder from "Containers/BurgerBuilder";
import Checkout from "Containers/Checkout";

class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/" component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
