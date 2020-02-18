import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { service } from "../../utils/apiConnect";

import ministersData from "./MinistersData";

class Minister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      minister: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      query: props.match.params.id
    };
  }

  componentDidMount() {
    const { query } = this.state;
    console.log(query);
    service
      .post(`/minister/${query}`)
      .then(res => {
        this.setState({
          minister: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { minister } = this.state;
    const ministerDetails = minister
      ? Object.entries(minister)
      : [
          [
            "id",
            <span>
              <i className="text-muted icon-ban"></i> Not found
            </span>
          ]
        ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1"></i>Minister:{" "}
                  {minister.name || this.props.match.params.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {ministerDetails.map(([key, value]) => {
                      return (
                        <tr key={key}>
                          <td>{`${key}:`}</td>
                          <td>
                            <strong>{value.toString()}</strong>
                          </td>
                        </tr>
                      );
                    })}
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

export default Minister;
