import React, { Component } from "react";
import { Button, Col, Row, Card, CardPanel } from "react-materialize";
import Charts from "../Charts";

class Results extends Component {
  createCanvas = (id, type, labels, label, data) => {
    return (
      <Charts id={id} type={type} labels={labels} label={label} data={data} />
    );
  };

  renderValues = () => {
    return this.props.APIData.map((e,i) => {
      console.log(e.attributes)

      let styles = {
        width: `${e.face_rectangle.width}px`,
        height: `${e.face_rectangle.height}px`,
        backgroundPosition: `-${e.face_rectangle.left}px -${e.face_rectangle.top}px`,
        backgroundImage: `url(${this.props.imgUrl})`
      }

      console.log(styles)

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
    console.log(this.props.APIData);

    return <Row className="resultsRow">{this.renderValues()}</Row>;
  }
}

export default Results;

// {this.createCanvas("beautyScore","doughnut", ["Male", "Female"], "Male & Females Beauty Ratings", [
//   e.beauty.male_score,
//   e.beauty.female_score
// ])}

// {this.createCanvas("emotion", "bar", ["Anger", "Disgust", "Fear", "Happiness", "Neutral", "Sadness", "Surprise" ], "Emotions", [
//   e.emotion.anger,
//   e.emotion.disgust,
//   e.emotion.fear,
//   e.emotion.happiness,
//   e.emotion.neutral,
//   e.emotion.sadness,
//   e.emotion.surprise
// ])}
