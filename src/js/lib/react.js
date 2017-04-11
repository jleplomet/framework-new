/* eslint-disable no-unused-vars*/
import React from "react";
/* eslint-enable no-unused-vars*/
import ReactDOM from "react-dom";

import {configureStore} from "js/lib/redux";
import {push} from "react-router-redux";
import RootComponent from "js/lib/components/RootComponent";

const NAMESPACE = "[js/lib/react]";

export function renderReact(mountElement, useRouter, defaultReducers) {
  console.log(NAMESPACE, "renderReact", "useRouter", useRouter);

  let {store, history} = configureStore(defaultReducers, useRouter);

  return new Promise(resolve => {
    ReactDOM.render(
      <RootComponent store={store} history={history} />,
      mountElement,
      () =>
        resolve({store, history, navigate: path => store.dispatch(push(path))})
    );
  });
}
