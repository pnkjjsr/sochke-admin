import React, { Component } from "react";

import { connect } from "react-redux";

import authSession from "utils/authSession";

import "./style.scss";

class UserImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUsr: ""
    };
  }
  static getDerivedStateFromProps(props) {
    if (props.login.user.photoURL) {
      return {
        imgUsr: props.login.user.photoURL
      };
    }

    return null;
  }

  componentDidMount() {
    const session = new authSession();
    let profile = session.getProfile();
    let photo = profile.photoURL;

    if (photo) {
      this.setState({
        imgUsr: photo
      });
    }
  }

  render() {
    const { imgUsr } = this.state;
    let user = !imgUsr ? (
      <i className="material-icons">account_circle</i>
    ) : (
      <img src={imgUsr} alt="user profile image" />
    );

    return <figure>{user}</figure>;
  }
}

export default connect(state => state)(UserImage);
