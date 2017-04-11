/* eslint-disable no-unused-vars*/
import React, {Component} from "react";
import PropTypes from "prop-types";
/* eslint-enable no-unused-vars*/
// import cx from 'classnames';

const NAMESPACE = "[js/components/landing]";

class Index extends Component {
  componentWillAppear(cb) {
    console.log(NAMESPACE, "componentWillAppear");

    // do nothing.
    cb();
  }

  componentDidAppear() {
    console.log(NAMESPACE, "componentDidAppear");
  }

  componentWillEnter(cb) {
    console.log(NAMESPACE, "componentWillEnter");

    // do nothing.
    cb();
  }

  componentDidEnter() {
    console.log(NAMESPACE, "componentDidEnter");
  }

  componentWillLeave(cb) {
    console.log(NAMESPACE, "componentWillLeave");

    // do nothing
    cb();
  }

  componentDidLeave() {
    console.log(NAMESPACE, "componentDidLeave");
  }

  componentDidMount() {
    console.log(NAMESPACE, "componentDidMount");
  }

  render() {
    return <div />;
  }
}

export default Index;
