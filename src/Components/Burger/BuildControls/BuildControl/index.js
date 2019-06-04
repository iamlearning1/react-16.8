import React from 'react';
import styles from './index.module.css';

const BuildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button
        className={styles.Less}
        onClick={() => props.removeIngredient(props.type)}
      >
        Less
      </button>
      <button
        className={styles.More}
        onClick={() => props.addIngredient(props.type)}
      >
        More
      </button>
    </div>
  );
};

export default BuildControl;
