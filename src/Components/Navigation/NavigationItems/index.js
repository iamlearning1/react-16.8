import React from 'react';

import NavigationItem from './NavigationItem';
import styles from './index.module.css';

export default props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);
