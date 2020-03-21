import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import authSession from "utils/authSession";

import HeaderOpen from "./HeaderOpen";
import HeaderUser from "./HeaderUser";

import "./style.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  static getDerivedStateFromProps(props) {
    const { login } = props;
    if (!login.token) {
      return null;
    } else {
      return {
        loggedIn: true
      };
    }
  }

  componentDidMount() {
    const session = new authSession();
    const token = session.getToken();
    if (token) {
      this.setState({
        loggedIn: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { login } = this.props;

    if (login.token != prevProps.login.token) {
      this.setState({
        loggedIn: false
      });
    }
  }

  render() {
    const { loggedIn } = this.state;
    return <Fragment>{!loggedIn ? <HeaderOpen /> : <HeaderUser />}</Fragment>;
  }
}

export default connect(state => state)(Header);
