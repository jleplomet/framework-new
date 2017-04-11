/* eslint-disable no-unused-vars*/
import React, {Component, PropTypes} from "react";
import {TransitionGroup} from "react-transition-group";
/* eslint-enable no-unused-vars*/
import {Route} from "react-router-dom";

import {AnimatedSwitch} from "js/lib/react-router";

import Landing from "js/components/landing";

class App extends Component {
  render() {
    return (
      <Route
        render={({location}) => (
          <TransitionGroup
            transitionName="example"
            transitionEnterTimeout={1500}
            transitionLeaveTimeout={100}>
            <AnimatedSwitch key={location.key} location={location}>
              <Route exact path="/" component={Landing} />
            </AnimatedSwitch>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
