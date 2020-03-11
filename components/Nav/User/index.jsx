import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loginActions from "pages/login/actions";

import authSession from "utils/authSession";
import authentication from "utils/authentication";

import UserImage from "components/UserImage";

import "./style.scss";

class UserNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      userName: "",
      displayName: ""
    };
  }

  handleLogout = e => {
    e.preventDefault();
    const { loginAction } = this.props;
    const session = new authSession();
    const auth = new authentication();

    Router.push("/login");
    loginAction.deauthenticate();
    session.logout();
    auth.signOut();
  };

  componentDidMount() {
    const session = new authSession();
    const profile = session.getProfile();

    this.setState({
      url: profile.userName,
      userName: profile.userName,
      displayName: profile.displayName
    });
  }

  render() {
    const { url, displayName, userName } = this.state;

    return (
      <Fragment>
        <nav className="user">
          <ul>
            <li className="user-details">
              <UserImage />
              <div className="title">
                <Link href={`/profile/${userName}`}>
                  <a>{displayName || userName}</a>
                </Link>
              </div>
            </li>
            <li>
              <Link href={`/profile/${url}`} as={`/profile/${url}`}>
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/constituency">
                <a>Account</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a onClick={this.handleLogout}>Logout</a>
              </Link>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(UserNav);
