import React from "react";
import styles from "./index.module.css";

import BuildControl from "./BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" }
];

const BuildControls = props => {
	return (
		<div className={styles.BuildControls}>
			<p>
				<b>Current Price: {props.price.toFixed(2)}</b>
			</p>
			{controls.map(control => (
				<BuildControl
					label={control.label}
					key={control.label}
					type={control.type}
					addIngredient={props.addIngredient}
					removeIngredient={props.removeIngredient}
					price={props.price}
				/>
			))}
			<button
				className={styles.OrderButton}
				disabled={!(props.price > 4)}
				onClick={props.ordered}
			>
				{props.authData ? "ORDER NOW" : "LOGIN TO ORDER"}
			</button>
		</div>
	);
};

export default BuildControls;
