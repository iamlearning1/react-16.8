import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import styles from "./index.module.css";

import { Toolbar, SideDrawer } from "Components/Navigation";

const Layout = props => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const { isAuthenticated, children } = props;

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	return (
		<Fragment>
			<Toolbar
				closed={sideDrawerClosedHandler}
				isAuthenticated={isAuthenticated}
			/>
			<SideDrawer
				closed={sideDrawerClosedHandler}
				open={showSideDrawer}
				isAuthenticated={isAuthenticated}
			/>
			<main className={styles.Container}>{children}</main>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.authData !== null
});

export default connect(mapStateToProps)(Layout);
