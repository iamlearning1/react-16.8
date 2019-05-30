import React, { Component } from 'react';
import { withFormik, Field, Form } from 'formik';
import { object, string, number } from 'yup';

import styles from './index.module.css';

import axios from 'api';

class ContactData extends Component {
  render() {
    const { errors, touched, isSubmitting } = this.props;
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <Form>
          <div className={styles.Input}>
            <Field
              type="text"
              name="name"
              placeholder="Your Name"
              style={
                touched.name &&
                errors.name &&
                !isSubmitting && {
                  border: '1px solid red'
                }
              }
            />
            {touched.name && errors.name && !isSubmitting && (
              <p>{errors.name}</p>
            )}
          </div>
          <div className={styles.Input}>
            <Field
              type="email"
              name="email"
              placeholder="Your Email"
              style={
                touched.email &&
                errors.email && {
                  border: '1px solid red'
                }
              }
            />
            {touched.email && errors.email && <p>{errors.email}</p>}
          </div>
          <div className={styles.Input}>
            <Field
              type="text"
              name="street"
              placeholder="Street Name"
              style={
                touched.street &&
                errors.street && {
                  border: '1px solid red'
                }
              }
            />
            {touched.street && errors.street && <p>{errors.street}</p>}
          </div>
          <div className={styles.Input}>
            <Field
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              style={
                touched.zipCode &&
                errors.zipCode && {
                  border: '1px solid red'
                }
              }
            />
            {touched.zipCode && errors.zipCode && <p>{errors.zipCode}</p>}
          </div>
          <div className={styles.Input}>
            <Field
              type="text"
              name="country"
              placeholder="Country"
              style={
                touched.country &&
                errors.country && {
                  border: '1px solid red'
                }
              }
            />
            {touched.country && errors.country && <p>{errors.country}</p>}
          </div>
          <button
            className={styles.Submit}
            disabled={isSubmitting}
            type="submit"
          >
            ORDER
          </button>
          {errors && isSubmitting && <p>{errors.name}</p>}
        </Form>
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
      .max(99999, 'Zip-Code must be of 5 digits')
      .required('Zip-Code is required'),
    country: string()
      .trim()
      .required('Country name is required')
  }),
  async handleSubmit(values, { props, setErrors, setSubmitting }) {
    try {
      await axios.post('/orders.json', {
        ingredients: props.ingredients,
        price: props.price,
        formData: values
      });
      props.history.push('/');
      setSubmitting(false);
    } catch (error) {
      setErrors(error);
    }
  }
})(ContactData);

export default FormikApp;
