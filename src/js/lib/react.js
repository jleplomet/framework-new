/* eslint-disable no-unused-vars*/
import React from "react";
/* eslint-enable no-unused-vars*/
import ReactDOM from "react-dom";
import Loadable from "react-loadable";

import {configureStore} from "js/lib/redux";
import RootComponent from "js/lib/components/RootComponent";

const NAMESPACE = "[js/lib/react]";

export function renderReact(mountElement, useRouter, defaultReducers) {
  console.log(NAMESPACE, "renderReact", "useRouter", useRouter);

  let {store, history} = configureStore(defaultReducers, useRouter);

  return new Promise(resolve => {
    ReactDOM.render(
      <RootComponent store={store} history={history} />,
      mountElement,
      () => resolve({store, navigate: path => history.push(path)})
    );
  });
}

export function loadComponent(opts) {
  return Loadable({
    LoadingComponent: () => null,
    ...opts,
  });
}
