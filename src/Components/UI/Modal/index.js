import React, { Fragment } from 'react';
import styles from './index.module.css';

import Backdrop from '../Backdrop';

export default props => (
  <Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed}>
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Backdrop>
  </Fragment>
);
