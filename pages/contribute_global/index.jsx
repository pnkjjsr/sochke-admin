import React, { Component, Fragment } from "react";
import userAuth from "utils/userAuth";
import Link from "next/link";
import Router from "next/router";
import { Table } from "reactstrap";
import Moment from "utils/moment";

import { service } from "utils/apiConnect";
import authSession from "utils/authSession";
import PageHeader from "components/Layout/PageHeader";

class ContributeGlobal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    service
      .get("/x-contributePublic")
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleAdd = () => {
    Router.push("/contribute_global/add");
  };

  renderRow = () => {
    const { data } = this.state;
    const moment = new Moment();

    return data.map((row, key) => {
      const createdAt = moment.format(row.createdAt);
      return (
        <tr key={row.id}>
          <th scope="row">{key}</th>
          <td>
            <Link href={`/contribute_global/edit?id=${row.id}`}>
              <a>{row.id}</a>
            </Link>
          </td>
          <td>{row.title}</td>
          <td>{createdAt}</td>
          <td>{row.status == true ? "Active" : "Disable"}</td>
          <td>{row.postedBy}</td>
        </tr>
      );
    });
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
                    <th>id</th>
                    <th>Title</th>
                    <th>CreatedAt</th>
                    <th>Status</th>
                    <th>Posted By</th>
                  </tr>
                </thead>
                <tbody>{this.renderRow()}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default userAuth(ContributeGlobal);
