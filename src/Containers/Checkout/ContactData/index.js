import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input, Spinner } from 'Components/UI';
import styles from './index.module.css';

import axios from 'api';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip-Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        validation: {
          required: true
        },
        value: 'fastest',
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  checkValidation = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  orderHandler = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const formData = {};
    for (let i in this.state.orderForm) {
      formData[i] = this.state.orderForm[i].value;
    }
    try {
      await axios.post('/orders.json', {
        ingredients: this.props.ingredients,
        price: parseFloat(this.props.totalPrice).toFixed(2),
        orderData: formData
      });
      this.setState({
        loading: false
      });
      this.props.history.push('/');
    } catch (error) {
      this.setState({
        loading: false
      });
    }
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

  contactForm = () => {
    const formElementsArray = [];
    const { orderForm } = this.state;
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
        changed={event => this.inputChangedHandler(event, element.id)}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        key={index}
      />
    ));
  };

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {this.contactForm()}
            <Button
              btnType="Success"
              clicked={this.orderHandler}
              disabled={!this.state.formIsValid}
            >
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice.toFixed(2)
});

export default connect(mapStateToProps)(ContactData);
