import React from 'react';
import styles from './index.module.css';

import BuildControls from './BuildControls';
import BurgerIngredient from './BurgerIngredients';
import OrderSummary from './OrderSummary';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((item, index) => (
        <BurgerIngredient key={igKey + index} type={igKey} />
      ));
    })
    .reduce((prevValue, currValue) => {
      return prevValue.concat(currValue);
    }, []);

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export { BuildControls, BurgerIngredient, OrderSummary, Burger as default };
