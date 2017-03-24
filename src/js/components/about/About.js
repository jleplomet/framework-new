/* eslint-disable no-unused-vars*/
import React, {Component, PropTypes} from "react";
/* eslint-enable no-unused-vars*/
//import cx from 'classnames';

class About extends Component {
  componentDidMount() {
    console.log("componentDidMount");

    // setTimeout(
    //   () => {
    //     const {navigate} = this.props;
    //
    //     navigate("/");
    //   },
    //   3000
    // );
  }

  componentWillEnter(cb) {
    console.log("componentWillEnter");

    // do nothing.
    cb();
  }

  componentWillLeave(cb) {
    console.log("componentWillLeave");

    // do nothing
    cb();
  }

  render() {
    return <div />;
  }
}

export default About;
