import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import {routerReducer, routerMiddleware} from "react-router-redux";
import thunkMiddleware from "redux-thunk";

const NAMESPACE = "[js/lib/redux]";

export function configureStore(reducers, useRouter) {
  console.log(NAMESPACE, "createStore");

  let history = getHistory(useRouter);
  let finalReducers = combineReducers({...reducers, router: routerReducer});
  let store = createStore(finalReducers, {}, storeEnhancer(history));

  return {store, history};
}

function storeEnhancer(history) {
  if (process.env.NODE_ENV === "production") {
    return compose(applyMiddleware(thunkMiddleware, routerMiddleware(history)));
  } else {
    let createLogger = require("redux-logger").createLogger;

    return compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        createLogger({level: "info", collapsed: true})
      )
    );
  }
}

function getHistory(type) {
  return require("history")[type]();
}
