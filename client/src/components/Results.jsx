import React, { Component } from "react";
import { Button, Col, Row, Card, CardPanel } from "react-materialize";
import Charts from "../Charts";
import MenuButtons from "./MenuButtons";

class Results extends Component {
  createCanvas = (id, type, labels, label, data) => {
    return (
      <Charts id={id} type={type} labels={labels} label={label} data={data} />
    );
  };

  renderValues = () => {
    debugger;
    return this.props.resultsData.map((e, i) => {
      console.log(e.attributes);

      let styles = {
        width: `${e.face_rectangle.width}px`,
        height: `${e.face_rectangle.height}px`,
        backgroundPosition: `-${e.face_rectangle.left}px -${
          e.face_rectangle.top
        }px`,
        backgroundImage: `url(${this.props.imgUrl})`
      };

      console.log(styles);
      //   <a className="btn-floating btn-small waves-effect waves-light right green">
      //   <i className="material-icons" onClick={() => this.props.updateFav(e)}>
      //   {this.props.showSavedResults.isFavorite ? "favorite" :"favorite_border" }
      //   </i>
      // </a>
      return (
        <Col s={4} key={i}>
          <CardPanel className="teal lighten-4 black-text">
            <div style={styles} />
            <h6>Age: {e.attributes.age.value}</h6>
            <h6>Ethnicity: {e.attributes.ethnicity.value}</h6>
            <h6>Gender: {e.attributes.gender.value}</h6>

            <br />
            <h5>Beauty Scores</h5>
            {this.createCanvas(
              `beautyScore${i}`,
              "pie",
              ["Male", "Female"],
              "Male & Females Beauty Ratings",
              [e.attributes.beauty.male_score, e.attributes.beauty.female_score]
            )}

            <br />
            <h5>Emotions</h5>
            {this.createCanvas(
              `emotion${i}`,
              "doughnut",
              [
                "Anger",
                "Disgust",
                "Fear",
                "Happiness",
                "Neutral",
                "Sadness",
                "Surprise"
              ],
              "Emotions",
              [
                e.attributes.emotion.anger,
                e.attributes.emotion.disgust,
                e.attributes.emotion.fear,
                e.attributes.emotion.happiness,
                e.attributes.emotion.neutral,
                e.attributes.emotion.sadness,
                e.attributes.emotion.surprise
              ]
            )}
          </CardPanel>
        </Col>
      );
    });
  };

  render() {
    console.log(this.props.resultsData);

    return (
      <Row className="resultsRow">
        <MenuButtons
          showSavedResults={this.props.showSavedResults}
          resultsData={this.props.resultsData}
          imgUrl={this.props.imgUrl}
          addInfo={this.props.addInfo}
          delInfo={this.props.delInfo}
        />

        {this.renderValues()}
      </Row>
    );
  }
}

export default Results;
