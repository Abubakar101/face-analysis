import React, { Component } from "react";
import { Button, Col, Row, Card } from "react-materialize";

class Result extends Component {
  render() {
    console.log(this.props.data);
    return (
      <p>
      </p>
    );
}
}

export default Result;

// <span>Age: {e.props.age.value}</span>
// <span>Ethnicity: {e.ethnicity.value}</span>
// <span>Gender: {e.gender.value}</span>