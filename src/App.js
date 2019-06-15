import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Layout from "Containers/Layout";
import BurgerBuilder from "Containers/BurgerBuilder";
// import Checkout from "Containers/Checkout";
// import Orders from "Containers/Checkout/Orders";
// import Auth from "Containers/Auth";
import Logout from "Containers/Auth/Logout";
import { Spinner } from "Components/UI";
import { authStatus } from "store/actions";

const Checkout = lazy(() => import("Containers/Checkout"));
const Orders = lazy(() => import("Containers/Checkout/Orders"));
const Auth = lazy(() => import("Containers/Auth"));

const App = props => {
	const { authData, authStatus } = props;

	useEffect(() => {
		authStatus();
	}, [authStatus]);

	return (
		<Layout>
			<Suspense fallback={<Spinner />}>
				<Switch>
					{authData && (
						<Route
							path="/checkout"
							render={props => <Checkout {...props} />}
						/>
					)}
					{authData && (
						<Route
							path="/orders"
							render={props => <Orders {...props} />}
						/>
					)}
					{!authData && (
						<Route
							path="/auth"
							render={props => <Auth {...props} />}
						/>
					)}
					<Route path="/logout" component={Logout} />
					<Route path="/" component={BurgerBuilder} />
				</Switch>
			</Suspense>
		</Layout>
	);
};

const mapStateToProps = state => ({
	authData: state.auth.authData
});

const mapDispatchToProps = dispatch => ({
	authStatus: () => dispatch(authStatus())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
