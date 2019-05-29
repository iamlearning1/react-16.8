import React from "react";

import styles from "./index.module.css";

export default props => {
	let inputElement = null;
	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select
					className={styles.InputElement}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option, index) => (
						<option value={option.value} key={index}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}
	return (
		<div className={styles.Input}>
			<label className={styles.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};
