import React, { Component, Fragment } from 'react';

import Burger from 'Components/Burger';
import BuildControls from 'Components/Burger/BuildControls';
import OrderSummary from 'Components/Burger/OrderSummary';
import Modal from 'Components/UI/Modal';
import Spinner from 'Components/UI/Spinner';
import withErrorHandler from 'hoc/withErrorHandler';

import axios from 'api';

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.2
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  async componentDidMount() {
    const { data } = await axios.get('ingredients.json');
    this.setState({
      ingredients: data
    });
  }

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

  purchaseContinueHandler = async () => {
    const { ingredients, price } = this.state;
    this.setState({
      loading: true
    });
    try {
      await axios.post('/orders.json', {
        ingredients,
        price,
        customer: {
          name: 'Deepak'
        }
      });
      this.setState({
        loading: false,
        purchasing: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        purchasing: false
      });
    }
  };

  render() {
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading
    } = this.state;
    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={ingredients}
              canceled={this.purchaseCancelHandler}
              continue={this.purchaseContinueHandler}
              totalPrice={totalPrice}
            />
          )}
        </Modal>
        {ingredients ? (
          <Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls
              addIngredient={this.addIngredientHandler}
              removeIngredient={this.removeIngredientHandler}
              price={totalPrice}
              purchasable={purchasable}
              ordered={this.purchaseHandler}
            />
          </Fragment>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
