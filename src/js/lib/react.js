import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {
  Router,
  browserHistory,
  hashHistory,
  createMemoryHistory,
} from "react-router";
import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

import {HASH_HISTORY, BROWSER_HISTORY} from "js/lib/core";

import routes from "js/routes";

const NAMESPACE = "[js/lib/react]";

export async function renderReact(mountElement, useRouter, defaultReducers) {
  console.log(NAMESPACE, "renderReact", "useRouter", useRouter);

  let store = configureStore(defaultReducers);

  return new Promise(resolve => {
    ReactDOM.render(
      <ConnectedRootComponent
        store={store}
        useRouter={useRouter}
        routes={routes}
      />,
      mountElement,
      resolve
    );
  });
}

class ConnectedRootComponent extends Component {
  getHistory() {
    const {useRouter} = this.props;

    if (useRouter === HASH_HISTORY) {
      return hashHistory;
    } else if (useRouter === BROWSER_HISTORY) {
      return browserHistory;
    }

    return createMemoryHistory();
  }

  render() {
    const {store, routes} = this.props;

    return (
      <Provider store={store}>
        <Router history={this.getHistory()} routes={routes} />
      </Provider>
    );
  }
}

function configureStore(reducers, initialState = {}) {
  console.log(NAMESPACE, "createStore");

  let finalReducers = combineReducers(reducers);
  let store = createStore(finalReducers, initialState, storeEnhancer());

  return store;
}

function storeEnhancer() {
  if (process.env.NODE_ENV === "production") {
    return compose(applyMiddleware(thunkMiddleware));
  } else {
    return compose(
      applyMiddleware(
        thunkMiddleware,
        require("redux-logger")({level: "info", collapsed: true})
      )
    );
  }
}
