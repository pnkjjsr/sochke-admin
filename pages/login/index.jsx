import React, { Component, Fragment } from "react";
import base64 from "base-64";
import utf8 from "utf8";

import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import actionNotifications from "components/Notification/actions";
import actionUser from "./actions";
import layoutActions from "layout/actions";

import authSession from "utils/authSession";
import authentication from "utils/authentication";
import Button from "components/Form/Button";

import { service } from "utils/apiConnect";

import validation from "./validation";
import "./style.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      email: "",
      password: "",
      emailErr: "",
      passwordErr: "",
      emailMsg: "",
      passwordMsg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static async getInitialProps({ pathname }) {
    const path = pathname;
    return { path };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { user, actionNotification } = this.props;

    const { valid, errors } = validation({ email, password });
    if (!valid) {
      actionNotification.showNotification({
        open: "",
        message: "Please enter the details.",
        type: "danger"
      });
      Object.keys(errors).map(e => {
        var err = e + "Err";
        var msg = e + "Msg";
        this.setState({
          [err]: "error",
          [msg]: errors[e]
        });
      });
      return;
    }

    const session = new authSession();
    let bytesPassword = utf8.encode(password);
    let encodedPassword = base64.encode(bytesPassword);
    let data = {
      email: email,
      password: encodedPassword
    };
    service
      .post("/x-login", data)
      .then(res => {
        const auth = new authentication();
        let uData = res.data;

        if (res.data.code == "user/not-register") {
          let obj = {
            message: res.data.message,
            type: "danger"
          };
          return actionNotification.showNotification(obj);
        }

        if (res.data.code == "user/wrong-password") {
          let obj = {
            message: res.data.message,
            type: "danger"
          };
          return actionNotification.showNotification(obj);
        }
        if (res.data.code == "user/not-admin") {
          let obj = {
            message: res.data.message,
            type: "danger"
          };
          return actionNotification.showNotification(obj);
        }

        auth
          .signInWithEmail(email, password)
          .then(res => {
            console.log(res);
            session.setProfile(uData);
            user.authenticate(uData);
            session.setToken(uData.id);
            Router.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        let obj = {
          message: error.message,
          type: "danger"
        };
        actionNotification.showNotification(obj);
      });
  }

  handleChange(e) {
    let elem = e.target.name;
    let err = elem + "Err";
    let msg = elem + "Msg";

    this.setState(
      {
        [elem]: e.target.value,
        [err]: "",
        [msg]: ""
      },
      () => this.state
    );
  }

  componentDidMount() {
    const { path, layoutAction } = this.props;
    layoutAction.update_path(path);
    const session = new authSession();
    let token = session.getToken();

    if (token) {
      Router.push("/");
    }
  }

  render() {
    const { emailErr, passwordErr, emailMsg, passwordMsg } = this.state;
    return (
      <Fragment>
        <div className="login">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <form onSubmit={this.handleSubmit} autoComplete="on">
                  <div className="form">
                    <div className="header">
                      <h1 className="heading">Login</h1>
                      <div className="sub">
                        Get access of your admin account!
                      </div>
                    </div>

                    <div className={`form-group ${emailErr}`}>
                      <label htmlFor="email">Email address</label>
                      <input
                        className="form-control"
                        name="email"
                        type="text"
                        aria-label="email"
                        placeholder="Email address"
                        onChange={this.handleChange}
                      />
                      <small className="form-text">{emailMsg}</small>
                    </div>

                    <div className={`form-group ${passwordErr}`}>
                      <div>
                        <label htmlFor="password">Password</label>
                        <span className="link-forgot float-right">
                          <Link href="/forgot-password">
                            <a>Request Password?</a>
                          </Link>
                        </span>
                      </div>

                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        aria-label="password"
                        placeholder="*******"
                        autoComplete="off"
                        onChange={this.handleChange}
                      />
                      <small className="form-text">{passwordMsg}</small>
                    </div>

                    <div className="form-action">
                      <Button
                        text="Login"
                        variant="btn-primary"
                        size="btn-lg"
                        type="submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{``}</style>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  user: bindActionCreators(actionUser, dispatch),
  actionNotification: bindActionCreators(actionNotifications, dispatch),
  layoutAction: bindActionCreators(layoutActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Login);
