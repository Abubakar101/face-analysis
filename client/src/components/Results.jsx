import React, { Component } from "react";
import { Col, Row, CardPanel } from "react-materialize";
import renderCharts from "./charts/createChart";

class Results extends Component {
  // Showing API search values
  renderValues = () => {
    return this.props.APIData.map((e, i) => {
      const styles = {
        width: `${e.face_rectangle.width}px`,
        height: `${e.face_rectangle.height}px`,
        backgroundPosition: `-${e.face_rectangle.left}px -${
          e.face_rectangle.top
        }px`,
        backgroundImage: `url(${this.props.imgUrl})`
      };

      return (
        <Col s={12} m={6} l={4} key={i}>
          <CardPanel className="teal lighten-4 black-text">
            <div style={styles} />
            <h6>Age: {e.attributes.age.value}</h6>
            <h6>Ethnicity: {e.attributes.ethnicity.value}</h6>
            <h6>Gender: {e.attributes.gender.value}</h6>

            {renderCharts(e, i)}
          </CardPanel>
        </Col>
      );
    });
  };

  render() {
    return (
      <Row className="resultsRow">
        <Col className="offset-s12">
          <a className="btn-floating btn-large waves-effect waves-light green ">
            <i
              className="material-icons"
              onClick={() =>
                this.props.addInfo(this.props.APIData, this.props.imgUrl)
              }
            >
              add
            </i>
          </a>
        </Col>

        {this.renderValues()}
      </Row>
    );
  }
}

export default Results;
