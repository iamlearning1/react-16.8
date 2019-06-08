import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Input, Button, Spinner } from "Components/UI";
import { auth } from "store/actions";

import styles from "./index.module.css";

class Auth extends Component {
	state = {
		orderForm: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Email"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 7
				},
				valid: false,
				touched: false
			}
		},
		formIsValid: false,
		isSignUp: true
	};

	checkValidation = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			// eslint-disable-next-line
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		let formData = {
			...this.state.orderForm
		};
		formData[inputIdentifier].value = event.target.value;
		formData[inputIdentifier].valid = this.checkValidation(
			event.target.value,
			formData[inputIdentifier].validation
		);
		formData[inputIdentifier].touched = true;
		let formIsValid = true;
		for (let inputIdentifier in formData) {
			formIsValid = formData[inputIdentifier].valid && formIsValid;
		}
		this.setState({
			orderForm: formData,
			formIsValid
		});
	};

	onSubmitHandler = event => {
		event.preventDefault();
		const { email, password, isSignUp } = this.state.orderForm;
		this.props.authenticate(email.value, password.value, isSignUp);
	};

	switchHandler = () => {
		this.setState(prevState => ({
			isSignUp: !prevState.isSignUp
		}));
	};

	render() {
		const formElementsArray = [];
		const { orderForm } = this.state;
		for (let key in orderForm) {
			formElementsArray.push({
				id: key,
				config: orderForm[key]
			});
		}
		const form = formElementsArray.map(element => (
			<Input
				key={element.id}
				elementType={element.config.elementType}
				value={element.config.value}
				elementConfig={element.config.elementConfig}
				changed={event => this.inputChangedHandler(event, element.id)}
				invalid={!element.config.valid}
				shouldValidate={element.config.validation}
				touched={element.config.touched}
			/>
		));
		const { loading, authData } = this.props;
		let content = <Redirect to="/" />;
		if (!authData) {
			content = (
				<div className={styles.Auth}>
					<form onSubmit={this.onSubmitHandler}>
						{form}
						{loading ? (
							<Spinner />
						) : (
							<Button
								btnType="Success"
								disabled={!this.state.formIsValid}
							>
								SUBMIT
							</Button>
						)}
					</form>
					<Button btnType="Danger" clicked={this.switchHandler}>
						Switch to{" "}
						{`${this.state.isSignUp ? "Sign-up" : "Sign-in"}`}
					</Button>
				</div>
			);
		}
		return content;
	}
}

const mapStateToProps = state => ({
	authData: state.auth.authData,
	error: state.auth.error,
	loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
	authenticate: (email, password, requestType) =>
		dispatch(auth(email, password, requestType))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
