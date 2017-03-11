import React, {Component} from "react";
import ReactDOM from "react-dom";

import RootComponent from "./components/RootComponent";

const NAMESPACE = "[js/lib/react]";

export function renderReact(mountElement, routes, cb) {
  console.log(NAMESPACE, "renderReact");

  console.log(NAMESPACE, "routes", routes);

  ReactDOM.render(<RootComponent routes={routes} />, mountElement, () => {
    if (cb) {
      cb();
    }
  });
}

export function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {Component: AsyncComponent.Component};
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;

          this.setState({Component});
        });
      }
    }

    render() {
      const {Component} = this.state;

      if (Component) {
        return <Component {...this.props} />;
      }

      return null;
    }
  }

  AsyncComponent.Component = null;

  return AsyncComponent;
}
