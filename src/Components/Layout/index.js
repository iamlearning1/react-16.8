import React, { Fragment, Component } from 'react';
import styles from './index.module.css';

import Toolbar from 'Components/Navigation/Toolbar';
import SideDrawer from 'Components/Navigation/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: !this.state.showSideDrawer
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar closed={this.sideDrawerClosedHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={styles.Container}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
