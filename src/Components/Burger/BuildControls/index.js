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
			{controls.map(control => (
				<BuildControl
					label={control.label}
					key={control.label}
					type={control.type}
					addIngredient={props.addIngredient}
					removeIngredient={props.removeIngredient}
				/>
			))}
		</div>
	);
};

export default BuildControls;
