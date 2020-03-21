import React, { Component, Fragment } from "react";

import userAuth from "utils/userAuth";
import { service } from "utils/apiConnect";

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      ministerCount: 0,
      respondCount: 0,
      contributionCount: 0
    };
  }

  componentDidMount() {
    service
      .post("/x-dashboard")
      .then(res => {
        let data = res.data;

        this.setState({
          userCount: data.userCount,
          ministerCount: data.ministerCount,
          respondCount: data.respondCount,
          contributionCount: data.contributionCount
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      userCount,
      ministerCount,
      respondCount,
      contributionCount
    } = this.state;
    return (
      <Fragment>
        <div className="home">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Users Count</h5>
                    <p className="card-text">{userCount}</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Ministers Count</h5>
                    <p className="card-text">{ministerCount}</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Respond Count</h5>
                    <p className="card-text">{respondCount}</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Contribution Count</h5>
                    <p className="card-text">{contributionCount}</p>
                  </div>
                </div>
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
  homeAction: bindActionCreators(homeActions, dispatch)
});

export default userAuth(Home);
