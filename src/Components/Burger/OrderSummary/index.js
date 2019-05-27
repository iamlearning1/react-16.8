import React, { Fragment } from 'react';

import Button from 'Components/UI/Button';

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
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </Fragment>
  );
};
