import React, { Component, Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "./action";

import userAuth from "utils/userAuth";
import authSession from "utils/authSession";

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respondView: 0,
      profile: "",
      data: {},
      polls: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    let data = props.home;
    let len = data.pms.length;

    if (len) {
      return {
        data: data,
        polls: data.polls,
        respondView: 1
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { homeAction, home } = this.props;
    const session = new authSession();
    const profile = session.getProfile();
    this.setState({
      profile: profile
    });

    homeAction.prefetchHomeData();
  }

  render() {
    return (
      <Fragment>
        <div className="home">
          <div className="container-fluid">Dashboard</div>
        </div>

        <style jsx>{``}</style>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(userAuth(Home));
