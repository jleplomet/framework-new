/* eslint-disable no-unused-vars*/
import React, {Component, PropTypes} from "react";
/* eslint-enable no-unused-vars*/
import {Provider} from "react-redux";
import {
  Router,
  browserHistory,
  hashHistory,
  createMemoryHistory,
} from "react-router";

import {HASH_HISTORY, BROWSER_HISTORY} from "js/lib/core";

class RootComponent extends Component {
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

export default RootComponent;
