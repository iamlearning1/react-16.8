import React, { Fragment } from 'react';
import styles from './index.module.css';

import Toolbar from 'Components/Navigation/Toolbar';
import SideDrawer from 'Components/Navigation/SideDrawer';

const Layout = props => (
  <Fragment>
    <Toolbar />
    <SideDrawer />
    <div>Toolbar, Drawer, Backdrop</div>
    <main className={styles.Container}>{props.children}</main>
  </Fragment>
);

export default Layout;
