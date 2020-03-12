import React, { Fragment, Component } from "react";
import Link from "next/link";

import "./style.scss";

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="footer" role="main">
          <div className="container-fluid">
            <div className="copyright">© 2019 {process.env.domain}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}
