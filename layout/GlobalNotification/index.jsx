import React, { Component, Fragment } from "react";

import authSession from "utils/authSession";

import "./style.scss";

class GlobalNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 1
    };
  }

  renderNotification = () => {
    const mainClass = "global_notification";
    return (
      <Fragment>
        <div className={mainClass}>
          Currently, we are operational only in <b>"New Delhi"</b>. Soon join
          you in your constituency. Do 'respond' &amp; 'contribution'.
        </div>
      </Fragment>
    );
  };

  componentDidMount() {
    const session = new authSession();
    const profile = session.getProfile();

    if (profile.state != "DELHI")
      this.setState({
        view: 0
      });
  }

  render() {
    const { view } = this.state;
    return !view ? this.renderNotification() : "";
  }
}

export default GlobalNotification;
