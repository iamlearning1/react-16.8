import React from 'react';

import styles from './index.module.css';

export default props => {
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      <input {...props} className={styles.InputElement} />
    </div>
  );
};
