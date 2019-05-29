import React, { Component } from 'react';

import Button from 'Components/UI/Button';
import Spinner from 'Components/UI/Spinner';
import styles from './index.module.css';

import axios from 'api';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    try {
      await axios.post('/orders.json', {
        ingredients: this.props.ingredients,
        price: this.props.price
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

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <input
              className={styles.Input}
              type="text"
              name="name"
              placeholder="Your Name"
            />
            <input
              className={styles.Input}
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <input
              className={styles.Input}
              type="text"
              name="street"
              placeholder="Street Name"
            />
            <input
              className={styles.Input}
              type="text"
              name="postalCode"
              placeholder="Postal Code"
            />
            <Button btnType="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
