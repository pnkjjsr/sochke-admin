import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionNotifications from "components/Notification/actions";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { service } from "utils/apiConnect";
import authSession from "utils/authSession";

import UploadFile from "components/UploadFile";

import PageHeader from "components/Layout/PageHeader";

import "./style.scss";

class ContributeAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      desc: "",
      imgUrl: ""
    };
  }

  handleChange = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, desc, imgUrl } = this.state;

    const session = new authSession();
    let profile = session.getProfile();

    let data = {
      createdAt: new Date().toISOString(),
      uid: profile.id,
      title: title,
      desc: desc,
      imgUrl: imgUrl,
      displayName: profile.displayName
    };

    service
      .post("/x-contributionPublic-add", data)
      .then(res => {
        console.log(res);
        this.setState({
          createdAt: "",
          uid: "",
          title: "",
          desc: "",
          imgUrl: "",
          displayName: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getImageUrl = e => {
    this.setState({
      imgUrl: e.imgUrl
    });
  };

  render() {
    const mainClass = "contribute_global";
    const { title, desc, imgUrl } = this.state;
    console.log(this.state);

    return (
      <Fragment>
        <div className={`${mainClass} container`}>
          <PageHeader title="Add Global Contribute" />

          <div className="row">
            <div className="col-12 col-md-6">
              <Form
                className={`${mainClass}__form`}
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <Label for="exampleEmail">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Max 70 char."
                    maxLength="70"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Description</Label>
                  <Input
                    type="textarea"
                    name="desc"
                    placeholder="Max 200 char."
                    maxLength="200"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="imgUrl">Image</Label>

                  <UploadFile
                    path="images/contributionPublic"
                    type="user"
                    action={e => this.getImageUrl(e)}
                  >
                    Click here to upload contribution image
                  </UploadFile>
                </FormGroup>

                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actionNotification: bindActionCreators(actionNotifications, dispatch)
});

export default connect(state => state, mapDispatchToProps)(ContributeAdd);
