import React from 'react';
import styles from './index.module.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';

export default props => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <Logo height="80%" />
    <nav className={styles.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
