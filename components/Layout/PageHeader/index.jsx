import React, { Component, Fragment } from "react";

import "./style.scss";

export default class ComponentPageHeader extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <h1 className="h1">{this.props.title}</h1>
        </div>
      </Fragment>
    );
  }
}
