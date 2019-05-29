import React from 'react';

import styles from './index.module.css';

export default props => {
  const ingredients = [];
  for (let ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient]
    });
  }

  const ingredientList = ingredients.map((ingredient, index) => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #333',
        padding: '5px'
      }}
      key={index}
    >
      {ingredient.name} ({ingredient.amount})
    </span>
  ));

  return (
    <div className={styles.Order}>
      <div>Ingredients: {ingredientList}</div>
      <p>
        Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
