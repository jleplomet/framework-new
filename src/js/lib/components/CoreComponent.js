/* eslint-disable no-unused-vars*/
import React, {Component, PropTypes, cloneElement} from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
/* eslint-enable no-unused-vars*/
//import cx from 'classnames';

const NAMESPACE = "[js/lib/components/corecomponent]";

class CoreComponent extends Component {
  getChildProps() {
    const {location} = this.props;

    return {
      key: `route-${cleanPathName(location.pathname)}`,
    };
  }

  render() {
    const {children} = this.props;

    return (
      <TransitionGroup component="div">
        {cloneElement(children || <div />, this.getChildProps())}
      </TransitionGroup>
    );
  }
}

function cleanPathName(pathname, defaultPathName = "index") {
  const cleaned = pathname.split("/")[1];

  if (cleaned === undefined || cleaned === false) {
    // we dont have a "/", just return the pathname
    return pathname;
  }

  return cleaned || defaultPathName;
}

export default CoreComponent;
