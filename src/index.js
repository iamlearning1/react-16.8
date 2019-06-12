import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import reducer from "store/reducers";
import { watchAuth } from "store/sagas";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// const logger = store => next => action => {
// 	console.log(action);
// 	const result = next(action);
// 	console.log(store.getState());
// 	return result;
// };

// const store = createStore(reducer, applyMiddleware(logger));

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;
const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
