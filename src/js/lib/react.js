import React from "react";
import ReactDOM from "react-dom";

import {configureStore} from "js/lib/redux";
import RootComponent from "js/lib/components/RootComponent";

import routes from "js/routes";

const NAMESPACE = "[js/lib/react]";

export function renderReact(mountElement, useRouter, defaultReducers) {
  console.log(NAMESPACE, "renderReact", "useRouter", useRouter);

  let store = configureStore(defaultReducers);

  return new Promise(resolve => {
    ReactDOM.render(
      <RootComponent store={store} routes={routes} />,
      mountElement,
      resolve
    );
  });
}
