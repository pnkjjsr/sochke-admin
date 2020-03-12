import React, { Fragment, Component } from "react";
import Link from "next/link";

import "./style.scss";

class HeaderOpen extends Component {
  render() {
    return (
      <Fragment>
        <div className="header" role="main">
          <div className="container">
            <div className="row">
              <div className="col-5 col-sm-6 pl-0 pr-0">
                <div className="logo">
                  <Link href="/">
                    <a>{process.env.domain}</a>
                  </Link>
                  <span>Sochke</span>
                </div>
              </div>
              <div className="col-7 col-sm-6 pr-0 text-right"></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HeaderOpen;
