import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionNotifications from "components/Notification/actions";
import Router from "next/router";

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
      id: "",
      createdAt: "",
      title: "",
      description: "",
      imgUrl: "",
      status: true,
      true: "",
      votePassCount: 0,
      voteAgreeCount: 0,
      voteDisagreeCount: 0,
      opinionCount: 0
    };
  }

  componentDidMount() {
    let id = Router.query.id;

    service
      .get(`/x-contributePublic/${id}`)
      .then(res => {
        this.setState({
          id: res.data.id,
          createdAt: res.data.createdAt,
          title: res.data.title,
          description: res.data.description,
          imgUrl: res.data.imgUrl,
          status: res.data.status,
          postedBy: res.data.postedBy,
          votePassCount: res.data.votePassCount,
          voteAgreeCount: res.data.voteAgreeCount,
          voteDisagreeCount: res.data.voteDisagreeCount,
          opinionCount: res.data.opinionCount
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, title, description, imgUrl, status } = this.state;

    const session = new authSession();
    let profile = session.getProfile();

    let data = {
      updatedAt: new Date().toISOString(),
      id: id,
      title: title,
      description: description,
      imgUrl: imgUrl,
      uid: profile.id,
      status: status,
      updatedBy: profile.displayName
    };

    service
      .post("/x-contributionPublic-update", data)
      .then(res => {
        console.log(res);
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
    const { title, description, imgUrl, status, postedBy } = this.state;

    return (
      <Fragment>
        <div className={`${mainClass} container`}>
          <PageHeader title="Edit Global Contribute" />

          <div className="row">
            <div className="col-12 col-md-6 float-right">
              <figure className="photo">
                <img src={imgUrl} alt="Contribution Public Image" />
              </figure>
            </div>
            <div className="col-12 col-md-6">
              <Form
                className={`${mainClass}__form`}
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <Label for="exampleEmail">Title</Label>
                  <Input
                    type="text"
                    placeholder="Max 70 char."
                    maxLength="70"
                    value={title}
                    name="title"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Description</Label>
                  <Input
                    type="textarea"
                    placeholder="Max 200 char."
                    maxLength="200"
                    value={description}
                    name="description"
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

                <FormGroup>
                  <Label for="exampleEmail">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    value={status}
                    onChange={this.handleChange}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Disable</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Posted By</Label>
                  <br />
                  <b>{postedBy}</b>
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
