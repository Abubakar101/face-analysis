import React, { Component } from "react";
import { Button, Col, Row, Card, CardPanel } from "react-materialize";
import Charts from "../Charts";

class SavedResults extends Component {
  createCanvas = (id, type, labels, label, data) => {
    return (
      <Charts id={id} type={type} labels={labels} label={label} data={data} />
    );
  };

  uniqueID = () =>
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);

  renderValues = () => {
    return this.props.resultsData.map(e => {
      let styles = {};
      return e.faces.map((j, i) => {
        styles = {
          width: `${j.face_rectangle.width}px`,
          height: `${j.face_rectangle.height}px`,
          backgroundPosition: `-${j.face_rectangle.left}px -${
            j.face_rectangle.top
          }px`,
          backgroundImage: `url(${e.image})`
        };
        console.log(styles);

        return (
          <Col s={4} key={i} id={e.id}>
            <CardPanel className="teal lighten-4 black-text">
              <Col className="s12 offset-s12">
                <a className="btn-floating btn-large waves-effect waves-light red ">
                  <i
                    className="material-icons"
                    onClick={() => this.props.delInfo()}
                  >
                    delete_forever
                  </i>
                </a>
              </Col>
              <div style={styles} />
              <h6>Age: {j.attributes.age.value}</h6>
              <h6>Ethnicity: {j.attributes.ethnicity.value}</h6>
              <h6>Gender: {j.attributes.gender.value}</h6>

              <br />
              <h5>Beauty Scores</h5>
              {this.createCanvas(
                `beautyScore${i + this.uniqueID()}`,
                "pie",
                ["Male", "Female"],
                "Male & Females Beauty Ratings",
                [
                  j.attributes.beauty.male_score,
                  j.attributes.beauty.female_score
                ]
              )}

              <br />
              <h5>Emotions</h5>
              {this.createCanvas(
                `emotion${i + this.uniqueID()}`,
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
                  j.attributes.emotion.anger,
                  j.attributes.emotion.disgust,
                  j.attributes.emotion.fear,
                  j.attributes.emotion.happiness,
                  j.attributes.emotion.neutral,
                  j.attributes.emotion.sadness,
                  j.attributes.emotion.surprise
                ]
              )}
            </CardPanel>
          </Col>
        );
      });

      //   console.log(styles);
      //   <a className="btn-floating btn-small waves-effect waves-light right green">
      //   <i className="material-icons" onClick={() => this.props.updateFav(e)}>
      //   {this.props.showSavedResults.isFavorite ? "favorite" :"favorite_border" }
      //   </i>
      // </a>
    });
  };

  render() {
    console.log(this.props.resultsData);

    return <Row className="resultsRow">{this.renderValues()}</Row>;
  }
}

export default SavedResults;
