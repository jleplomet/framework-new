import React from "react";
import {Route, IndexRoute} from "react-router";

import CoreComponent from "js/lib/components/CoreComponent";

import Index from "js/components/landing/Index";

function lazyLoad(component, cb) {
  import(`js/components/${component}`).then(module => cb(null, module.default));
}

function getComponent(path) {
  return (l, cb) => lazyLoad(path, cb);
}

export default (
  <Route path="/" component={CoreComponent}>
    <IndexRoute component={Index} />
    <Route path="/about" getComponent={getComponent("about/About")} />
  </Route>
);
