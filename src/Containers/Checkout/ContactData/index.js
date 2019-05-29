import React, { Component } from 'react';
import { withFormik, Field, Form } from 'formik';
import { object, string, number } from 'yup';

import Button from 'Components/UI/Button';
import Spinner from 'Components/UI/Spinner';
import Input from 'Components/UI/Input';
import styles from './index.module.css';

import axios from 'api';

class ContactData extends Component {
  state = {
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
        price: parseFloat(this.props.price).toFixed(2)
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
    const { errors, touched, isSubmitting } = this.props;
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Form>
            <div className={styles.Input}>
              <Field type="text" name="name" placeholder="Your Name" />
              {touched.name && errors.name && <p>{errors.name}</p>}
            </div>
            <div className={styles.Input}>
              <Field type="email" name="email" placeholder="Your Email" />
              {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <div className={styles.Input}>
              <Field type="text" name="street" placeholder="Street Name" />
              {touched.street && errors.street && <p>{errors.street}</p>}
            </div>
            <div className={styles.Input}>
              <Field type="text" name="zipCode" placeholder="Zip Code" />
              {touched.zipCode && errors.zipCode && <p>{errors.zipCode}</p>}
            </div>
            <div className={styles.Input}>
              <Field type="text" name="country" placeholder="Country" />
              {touched.country && errors.country && <p>{errors.country}</p>}
            </div>
            <button
              style={{
                color: '#5c9210',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
              disabled={isSubmitting}
              type="submit"
            >
              ORDER
            </button>
            {/* <Button
              btnType="Success"
              clicked={this.orderHandler}
              disabled={isSubmitting}
            >
              ORDER
            </Button> */}
          </Form>
        )}
      </div>
    );
  }
}

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      name: '',
      email: '',
      street: '',
      zipCode: '',
      country: ''
    };
  },
  validationSchema: object().shape({
    name: string()
      .min(6)
      .trim()
      .required('Name is required'),
    email: string()
      .email()
      .required('Email is required'),
    street: string()
      .trim()
      .required('Street name is required'),
    zipCode: number()
      .min(5, 'Zip-Code must be of 5 letters')
      .positive()
      .required('Zip-Code is required'),
    country: string()
      .trim()
      .required('Country name is required')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log(values);
    resetForm();
    setSubmitting(false);
  }
})(ContactData);

export default FormikApp;
