import React, { Component, Fragment } from 'react';

import Burger from 'Components/Burger';
import BuildControls from 'Components/Burger/BuildControls';
import OrderSummary from 'Components/Burger/OrderSummary';
import Modal from 'Components/UI/Modal';

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.2
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    let updatedCount = this.state.ingredients[type] - 1;
    if (updatedCount === -1) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('Continue');
  };

  render() {
    const { ingredients, totalPrice, purchasable, purchasing } = this.state;
    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            canceled={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            totalPrice={totalPrice}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          price={totalPrice}
          purchasable={purchasable}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
