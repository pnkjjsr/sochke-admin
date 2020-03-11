import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";

import { service } from "apiConnect";

class Test extends Component {
  static async getInitialProps({ query }) {
    console.log(query);
    return query;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let data = {
      uid: "eGWIBgftsod5YShYKT1cCtJkT5j1"
    };
    service
      .post("/page-home", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        <div>Test</div>
      </Fragment>
    );
  }
}

export default connect(state => state)(Test);
