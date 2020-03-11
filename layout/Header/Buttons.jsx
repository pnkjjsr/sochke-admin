import React, { Component } from "react";
import Router from "next/router";

import { connect } from "react-redux";

import Button from "components/Form/Button";

import "./style.scss";

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnSize: ""
    };
  }

  handleLogin = () => {
    Router.push("/login");
  };
  handleSignup = () => {
    Router.push("/register");
  };

  handleBtnSize = () => {
    if (screen.width > 1410) {
      this.setState({
        btnSize: "btn-lg"
      });
    } else if (screen.width < 992) {
      this.setState({
        btnSize: "btn-sm"
      });
    } else {
      this.setState({
        btnSize: ""
      });
    }
  };

  componentDidMount() {
    this.handleBtnSize();
  }

  render() {
    const { btnSize } = this.state;
    const { layout } = this.props;

    return (
      <div className="auth">
        {layout.path == "/login" ? (
          <Button
            text="Create new account"
            size={btnSize}
            variant="btn-outline-primary"
            action={this.handleSignup}
          />
        ) : (
          <Button
            text="Login"
            size={btnSize}
            variant="btn-outline-primary"
            action={this.handleLogin}
          />
        )}
      </div>
    );
  }
}

export default connect(state => state)(Buttons);
