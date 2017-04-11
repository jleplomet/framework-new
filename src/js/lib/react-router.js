/* eslint-disable no-unused-vars*/
import React, {Component} from "react";
/* eslint-enable no-unused-vars*/
import {matchPath} from "react-router";
import {Switch} from "react-router-dom";

export class AnimatedSwitch extends Switch {
  render() {
    const {route} = this.context.router;
    const {children} = this.props;
    const location = this.props.location || route.location;

    let match, child;
    React.Children.forEach(children, element => {
      if (!React.isValidElement(element)) return;

      const {path: pathProp, exact, strict, from} = element.props;
      const path = pathProp || from;

      if (match == null) {
        child = element;
        match = path
          ? matchPath(location.pathname, {path, exact, strict})
          : route.match;
      }
    });

    return match
      ? React.cloneElement(child, {
          location,
          computedMatch: match,
          ref: element => {
            this.element = element;
          },
        })
      : null;
  }
}

["WillAppear", "WillEnter", "WillLeave"].forEach(key => {
  let method = `component${key}`;

  AnimatedSwitch.prototype[method] = function(cb) {
    let {component} = this.element.props;

    if (component && component.prototype.hasOwnProperty(method)) {
      component.prototype[method](cb);
    } else {
      cb();
    }
  };
});

["DidAppear", "DidEnter", "DidLeave"].forEach(key => {
  let method = `component${key}`;

  AnimatedSwitch.prototype[method] = function() {
    let {component} = this.element.props;

    if (component && component.prototype.hasOwnProperty(method)) {
      component.prototype[method]();
    }
  };
});
