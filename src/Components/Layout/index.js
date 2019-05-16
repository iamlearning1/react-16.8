import React, { Fragment } from "react";
import styles from "./index.module.css";

const Layout = props => (
	<Fragment>
		<div>Toolbar, Drawer, Backdrop</div>
		<main className={styles.Container}>{props.children}</main>
	</Fragment>
);

export default Layout;
