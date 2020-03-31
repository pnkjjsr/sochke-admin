import React, { Component, Fragment } from "react";
import userAuth from "utils/userAuth";
import Router from "next/router";
import { Table } from "reactstrap";

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
            <div className="col-12">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Posted By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Contribute 1</td>
                    <td>Pankaj Jasoria</td>
                    <td>
                      <a href="">Edit</a> <a href="">Delete</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default userAuth(ContributeGlobal);
