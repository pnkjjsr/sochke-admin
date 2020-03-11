import React, { Fragment, Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import authSession from "utils/authSession";

import User from "components/User";
import Drawer from "components/Drawer";
import AccountNav from "components/Nav/Account";

import Buttons from "./Buttons";

import "./style.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bg: "",
      dMenu: "d-none",
      openMenu: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { user } = props;

    if (user.profile.uid) {
      return {
        bg: "bg",
        dMenu: "d-inline-block"
      };
    }
    return true;
  }

  handleOpen = () => {
    this.setState({
      openMenu: "open"
    });
  };
  handleClose = () => {
    this.setState({
      openMenu: ""
    });
  };

  componentDidMount() {
    const session = new authSession();
    let token = session.loggedIn();
    if (token) {
      this.setState({
        bg: "bg",
        dMenu: "d-inline-block"
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user.profile.uid != user.profile.uid) {
      this.setState({
        bg: "",
        dMenu: "d-none"
      });
    }
  }

  render() {
    const { bg, dMenu, openMenu } = this.state;

    return (
      <Fragment>
        <div className={`header ${bg}`} role="main">
          <div className="container">
            <div className="row">
              <div className="col-5 col-sm-6 pl-0 pr-0">
                <div className={`menu d-inline-block d-lg-none ${dMenu}`}>
                  <span onClick={this.handleOpen}>Menu Icon</span>
                  <Drawer side="left" open={openMenu} action={this.handleClose}>
                    <AccountNav />
                  </Drawer>
                </div>

                <div className="logo">
                  <Link href="/">
                    <a>{process.env.domain}</a>
                  </Link>
                </div>
              </div>
              <div className="col-7 col-sm-6 pr-0 text-right">
                <User />
                <Buttons />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(Header);
