import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Spinner } from "Components/UI";
import { logout } from "store/actions";

class Logout extends Component {
	componentDidMount() {
		this.props.logout();
		this.props.history.replace("/");
	}
	render() {
		return <Spinner />;
	}
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

export default connect(
	null,
	mapDispatchToProps
)(withRouter(Logout));
