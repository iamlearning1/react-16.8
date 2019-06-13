import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import styles from "./index.module.css";

import { Toolbar, SideDrawer } from "Components/Navigation";

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: !this.state.showSideDrawer
		});
	};

	render() {
		const { isAuthenticated } = this.props;
		return (
			<Fragment>
				<Toolbar
					closed={this.sideDrawerClosedHandler}
					isAuthenticated={isAuthenticated}
				/>
				<SideDrawer
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}
					isAuthenticated={isAuthenticated}
				/>
				<main className={styles.Container}>{this.props.children}</main>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.authData !== null
});

export default connect(mapStateToProps)(Layout);
