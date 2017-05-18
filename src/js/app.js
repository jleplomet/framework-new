/* eslint-disable no-unused-vars*/
import React, {Component, PropTypes} from "react";
import {CSSTransitionGroup} from "react-transition-group";
/* eslint-enable no-unused-vars*/
import {Switch, Route} from "react-router-dom";

import {addListenerOnce} from "js/lib/emitter";
// import {loadComponent} from "js/lib/react";

import Landing from "js/components/landing";

const NAMESPACE = "[js/app]";

let preloadRoutes = [];

class App extends Component {
  componentWillMount() {
    addListenerOnce("preload", () => this.preloadRoutes());
  }

  preloadRoutes() {
    if (preloadRoutes.length >= 1) {
      console.log(NAMESPACE, "preloadRoutes", preloadRoutes.length);

      preloadRoutes.forEach(route => route.preload());
    }
  }

  render() {
    return (
      <Route
        render={({location}) => (
          <CSSTransitionGroup
            component="div"
            className="routes-container"
            transitionName="example"
            transitionEnterTimeout={1500}
            transitionLeaveTimeout={100}>
            <Switch key={location.key} location={location}>
              <Route exact path="/landing" component={Landing} />
            </Switch>
          </CSSTransitionGroup>
        )}
      />
    );
  }
}

export default App;
