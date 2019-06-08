import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Layout from "Containers/Layout";
import BurgerBuilder from "Containers/BurgerBuilder";
import Checkout from "Containers/Checkout";
import Orders from "Containers/Checkout/Orders";
import Auth from "Containers/Auth";
import Logout from "Containers/Auth/Logout";

class App extends Component {
	render() {
		const { authData } = this.props;
		return (
			<Layout>
				<Switch>
					{authData && (
						<Route path="/checkout" component={Checkout} />
					)}
					{authData && <Route path="/orders" component={Orders} />}
					<Route path="/auth" component={Auth} />
					<Route path="/logout" component={Logout} />
					<Route path="/" component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	authData: state.auth.authData
});

export default connect(mapStateToProps)(App);
