import React, { Fragment } from 'react';

import Logo from 'Components/Logo';
import NavigationItems from 'Components/Navigation/NavigationItems';
import Backdrop from 'Components/UI/Backdrop';

import styles from './index.module.css';

const SideDrawer = props => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedStyles.join(' ')}>
        <Logo height="10%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
