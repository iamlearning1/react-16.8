import React, { Component } from "react";
import "./App.css";

import Layout from "./Components/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder";

class App extends Component {
	render() {
		return (
			<Layout>
				<BurgerBuilder />
			</Layout>
		);
	}
}

export default App;
