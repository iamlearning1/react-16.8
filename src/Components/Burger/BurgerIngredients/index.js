import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const BurgerIngredients = props => {
	let ingredient = null;
	switch (props.type) {
		case "bread-bottom":
			ingredient = <div className={styles.BreadBottom} />;
			break;
		case "bread-top":
			ingredient = (
				<div className={styles.BreadTop}>
					<div className={styles.Seeds1} />
					<div className={styles.Seeds2} />
				</div>
			);
			break;
		case "meat":
			ingredient = <div className={styles.Meat} />;
			break;
		case "salad":
			ingredient = <div className={styles.Salad} />;
			break;
		case "bacon":
			ingredient = <div className={styles.Bacon} />;
			break;
		case "cheese":
			ingredient = <div className={styles.Cheese} />;
			break;
		default:
			ingredient = null;
	}
	return ingredient;
};

BurgerIngredients.propTypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngredients;
