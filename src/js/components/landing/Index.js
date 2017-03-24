/* eslint-disable no-unused-vars*/
import React, {Component, PropTypes} from "react";
/* eslint-enable no-unused-vars*/
//import cx from 'classnames';

const NAMESPACE = "[js/components/landing/index]";

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

  componentWillLeave(cb) {
    console.log(NAMESPACE, "componentWillLeave");

    // do nothing
    cb();
  }

  componentDidMount() {
    console.log(NAMESPACE, "componentDidMount");

    // setTimeout(
    //   () => {
    //     const {navigate} = this.props;
    //
    //     navigate("/about");
    //   },
    //   2000
    // );
  }

  render() {
    return <div />;
  }
}

export default Index;
