import React from 'react';
import styles from './index.module.css';
import Logo from 'Components/Logo';
import NavigationItems from 'Components/Navigation/NavigationItems';
import Menu from 'Components/UI/Menu';

export default props => (
  <header className={styles.Toolbar}>
    <Menu clicked={props.closed} />
    <Logo height="80%" />
    <nav className={styles.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
