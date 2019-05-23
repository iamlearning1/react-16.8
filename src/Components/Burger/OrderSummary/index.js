import React, { Fragment } from 'react';

export default props => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (igKey, index) => (
      <li key={index}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    )
  );
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout</p>
    </Fragment>
  );
};
