import React, { useState } from "react";
import { connect } from "react-redux";

import { Button, Input, Spinner } from "Components/UI";
import { purchaseBurger } from "store/actions";
import styles from "./index.module.css";

const ContactData = props => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your Name"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your Email"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street Name"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Zip-Code"
			},
			value: "",
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Country"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		deliveryMethod: {
			elementType: "select",
			elementConfig: {
				options: [
					{ value: "fastest", displayValue: "Fastest" },
					{ value: "cheapest", displayValue: "Cheapest" }
				]
			},
			validation: {
				required: true
			},
			value: "fastest",
			valid: true
		}
	});
	const [formIsValid, setFormIsValid] = useState(false);

	const checkValidation = (value, rules) => {
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

		return isValid;
	};

	const orderHandler = async e => {
		e.preventDefault();
		const {
			authData,
			ingredients,
			totalPrice,
			history,
			purchaseBurger
		} = props;
		const formData = {};
		for (let i in orderForm) {
			formData[i] = orderForm[i].value;
		}
		purchaseBurger(formData, authData.localId, ingredients, totalPrice);
		history.push("/");
	};

	const inputChangedHandler = (event, inputIdentifier) => {
		let formData = {
			...orderForm
		};
		formData[inputIdentifier].value = event.target.value;
		formData[inputIdentifier].valid = checkValidation(
			event.target.value,
			formData[inputIdentifier].validation
		);
		formData[inputIdentifier].touched = true;
		let formIsValid = true;
		for (let inputIdentifier in formData) {
			formIsValid = formData[inputIdentifier].valid && formIsValid;
		}
		setOrderForm(formData);
		setFormIsValid(formIsValid);
	};

	const contactForm = () => {
		const formElementsArray = [];
		for (let key in orderForm) {
			formElementsArray.push({
				id: key,
				config: orderForm[key]
			});
		}
		return formElementsArray.map((element, index) => (
			<Input
				elementType={element.config.elementType}
				value={element.config.value}
				elementConfig={element.config.elementConfig}
				changed={event => inputChangedHandler(event, element.id)}
				invalid={!element.config.valid}
				shouldValidate={element.config.validation}
				touched={element.config.touched}
				key={index}
			/>
		));
	};

	const { id } = props;
	return (
		<div className={styles.ContactData}>
			<h4>Enter your Contact Data</h4>
			{id ? (
				<Spinner />
			) : (
				<form onSubmit={orderHandler}>
					{contactForm()}
					<Button
						btnType="Success"
						clicked={orderHandler}
						disabled={!formIsValid}
					>
						ORDER
					</Button>
				</form>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	ingredients: state.burgerBuilder.ingredients,
	totalPrice: state.burgerBuilder.totalPrice.toFixed(2),
	error: state.order.error,
	id: state.order.id,
	authData: state.auth.authData
});

const mapDispatchToProps = dispatch => ({
	purchaseBurger: (data, userId, ingredients, totalPrice) =>
		dispatch(purchaseBurger(data, userId, ingredients, totalPrice))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactData);
