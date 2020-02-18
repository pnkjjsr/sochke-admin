import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

// import ministersData from "./MinistersData";
import { service } from "../../utils/apiConnect";

class Ministers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ministers: []
    };
  }

  componentDidMount() {
    service
      .post("/ministers")
      .then(res => {
        this.setState({
          ministers: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderMinisterRow = () => {
    const { ministers } = this.state;
    const getBadge = status => {
      return status === "true" ? "success" : "danger";
    };

    return ministers.map((minister, index) => {
      const ministerLink = `/ministers/${minister.id}`;
      return (
        <tr key={minister.id.toString()}>
          <th scope="row">
            <Link to={ministerLink}>{minister.id}</Link>
          </th>
          <td>
            <Link to={ministerLink}>{minister.name}</Link>
          </td>
          <td>{minister.constituency}</td>
          <td>{minister.type}</td>
          <td>{minister.year}</td>
          <td>{minister.partyShort}</td>
          <td>
            <Link to={ministerLink}>
              <Badge color={getBadge(minister.winner.toString())}>
                {minister.winner.toString()}
              </Badge>
            </Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { ministers } = this.state;
    let ministerLen = ministers.length;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Ministers{" "}
                <small className="text-muted">Details</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Constituency</th>
                      <th scope="col">Type</th>
                      <th scope="col">Year</th>
                      <th scope="col">Party</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!ministerLen ? "loading..." : this.renderMinisterRow()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Ministers;
