import React, { Component } from 'react';
import './App.css';

import Layout from 'Components/Layout';
import BurgerBuilder from 'Containers/BurgerBuilder';
import Checkout from 'Containers/Checkout';

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout>
    );
  }
}

export default App;
