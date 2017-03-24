import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

const NAMESPACE = "[js/lib/redux]";

export function configureStore(reducers, initialState = {}) {
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
