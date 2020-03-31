import React, { Component, Fragment } from "react";
import userAuth from "utils/userAuth";
import Router from "next/router";

import PageHeader from "components/Layout/PageHeader";

class ContributeGlobal extends Component {
  handleAdd = () => {
    Router.push("/contribute_global/add");
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col">
              <PageHeader title="Contribute By Admin" />
            </div>
            <div className="col text-right">
              <button className="btn btn-primary" onClick={this.handleAdd}>
                + Add New
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default userAuth(ContributeGlobal);
