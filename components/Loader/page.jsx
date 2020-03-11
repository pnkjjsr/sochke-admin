import React, { Component, Fragment } from "react";

import "./style.scss";

export default class PageLoader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="page-loader">
          <span></span>
        </div>
      </Fragment>
    );
  }
}
