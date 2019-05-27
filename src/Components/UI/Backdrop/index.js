import React from 'react';
import styles from './index.module.css';

export default props =>
  props.show ? (
    <div className={styles.Backdrop} onClick={props.clicked}>
      {props.children}
    </div>
  ) : null;
