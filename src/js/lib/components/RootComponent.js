/* eslint-disable no-unused-vars*/
import React, {Component} from "react";
import PropTypes from "prop-types";
/* eslint-enable no-unused-vars*/
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import {Route} from "react-router-dom";

import App from "js/app";

class RootComponent extends Component {
  render() {
    const {store, history} = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route component={App} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default RootComponent;
