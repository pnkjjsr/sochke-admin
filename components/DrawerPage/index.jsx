import React, { Component, Fragment } from "react";

import "./style.scss";

class DrawerPage extends Component {
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
        <div className={`drawer-page ${side} ${open}`}>
          <div className="container">
            <div className="content">
              <div className="back">
                <button className="btn btn-link" onClick={this.handleClose}>
                  <i className="material-icons">keyboard_backspace</i>
                </button>
              </div>

              {this.props.children}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DrawerPage;
