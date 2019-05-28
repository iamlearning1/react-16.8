import React from "react";
import Burger from "Components/Burger";
import Button from "Components/UI/Button";

import styles from "./index.module.css";

export default props => (
	<div className={styles.CheckoutSummary}>
		<h1>We hope it tastes well!</h1>
		<div
			style={{
				width: "100%",
				margin: "auto"
			}}
		>
			<Burger ingredients={props.ingredients} />
			<Button btnType="Danger" clicked>
				CANCEL
			</Button>
			<Button btnType="Success" clicked>
				CONTINUE
			</Button>
		</div>
	</div>
);
