import React from 'react';
import styles from './index.module.css';

export default props => (
  <button
    className={[styles.Button, styles[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
