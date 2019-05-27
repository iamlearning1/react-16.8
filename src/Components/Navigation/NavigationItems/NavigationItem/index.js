import React from 'react';
import styles from './index.module.css';

export default props => (
  <li className={styles.NavigationItem}>
    <a href="/" className={props.active ? styles.active : null}>
      {props.children}
    </a>
  </li>
);
