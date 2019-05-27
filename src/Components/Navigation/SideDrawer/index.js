import React from 'react';

import Logo from 'Components/Logo';
import NavigationItems from 'Components/Navigation/NavigationItems';

import styles from './index.module.css';

const SideDrawer = props => {
  return (
    <div className={styles.SideDrawer}>
      <Logo height="10%" />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
