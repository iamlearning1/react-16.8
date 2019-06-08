import React from "react";

import NavigationItem from "./NavigationItem";
import styles from "./index.module.css";

export default props => (
	<ul className={styles.NavigationItems}>
		<NavigationItem link="/" exact>
			Burger Builder
		</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
		{!props.isAuthenticated ? (
			<NavigationItem link="/auth">Authenticate</NavigationItem>
		) : (
			<NavigationItem link="/logout">LOGOUT</NavigationItem>
		)}
	</ul>
);
