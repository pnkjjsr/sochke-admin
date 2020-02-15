import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import ministersData from "./MinistersData";
import { service } from "../../utils/apiConnect";

function UserRow(props) {
  const minister = props.minister;
  const ministerLink = `/ministers/${minister.id}`;

  const getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr key={minister.id.toString()}>
      <th scope="row">
        <Link to={ministerLink}>{minister.id}</Link>
      </th>
      <td>
        <Link to={ministerLink}>{minister.name}</Link>
      </td>
      <td>{minister.registered}</td>
      <td>{minister.role}</td>
      <td>
        <Link to={ministerLink}>
          <Badge color={getBadge(minister.status)}>{minister.status}</Badge>
        </Link>
      </td>
    </tr>
  );
}

class Ministers extends Component {
  componentDidMount() {
    service
      .post("/test")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const ministerList = ministersData.filter(minister => minister.id < 10);

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
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ministerList.map((minister, index) => (
                      <UserRow key={index} minister={minister} />
                    ))}
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
