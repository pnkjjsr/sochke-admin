import React, { Component, Fragment } from "react";

import "./style.scss";

class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  handleOpen = () => {};
  handleClose = () => {
    const { action } = this.props;
    action();
  };

  render() {
    const { side, open } = this.props;
    return (
      <Fragment>
        <div className={`drawer ${side} ${open}`} onClick={this.handleClose}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Drawer;
