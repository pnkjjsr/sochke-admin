import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import actions from "./actions";

import "./style.scss";

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    const { hideNotification } = this.props;
    hideNotification();
  };

  componentDidUpdate(prevProps, prevState) {
    const { hideNotification } = this.props;
    const { open } = this.props.notification;
    const { notification } = prevProps;

    if (notification.open != open) {
      setTimeout(() => {
        hideNotification();
      }, 5000);
    }
  }

  render() {
    const { open, message, type } = this.props.notification;

    return (
      <Fragment>
        <div className={`notification ${open}`}>
          <div className={`alert alert-${type} alert-dismissible`} role="alert">
            {message} &nbsp;
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state, actions)(Notification);
