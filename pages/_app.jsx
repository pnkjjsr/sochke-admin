import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store";

import { service } from "utils/apiConnect";
import authSession from "utils/authSession";

import Layout from "layout";
import Notification from "components/Notification";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      key: false
    };
  }

  componentDidMount() {
    const { router } = this.props;
    const session = new authSession();
    const secretKey = session.getSecretKey();

    if (router.query.key == process.env.secretKey || secretKey) {
      session.setSecretKey(true);
      this.setState({
        key: true
      });
    }
  }

  render() {
    const { key } = this.state;
    const { Component, ctx, router, pageProps, store } = this.props;

    if (
      router.query.key == process.env.secretKey ||
      key == true ||
      process.env.NODE_ENV == "development"
    ) {
      return (
        <Provider store={store}>
          <Layout pageTitle={router.route}>
            <Notification />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      );
    } else {
      return false;
    }
  }
}

export default withRedux(initStore, { debug: false })(MyApp);
