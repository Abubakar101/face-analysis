import React, { Component } from "react";
import { Col, Row, CardPanel } from "react-materialize";
import Charts from "../Charts";

class SavedResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delID: null,
      isFavorite: false
    };
  }

  //   Charts
  createCanvas = (id, type, labels, label, data) => {
    return (
      <Charts id={id} type={type} labels={labels} label={label} data={data} />
    );
  };

  //   Creating a random unique ID for Canvas
  uniqueID = () =>
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);

  //   Saving delID to pass down to to delete function
  saveID = delID => {
    if (delID) {
      this.setState({ delID });
    } else {
      this.setState({ delID: null });
    }
  };

  setFav = () => {
    this.setState({ isFavorite: !this.state.isFavorite });
  };

  //   Saved Values from Database
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

        let favClassName = `btn-floating btn-small waves-effect waves-light right ${
          e.favorite ? "green" : "grey"
        }`;

        let changeDelColor =
          this.state.delID === e.id
            ? { backgroundColor: `#ff000036` }
            : { backgroundColor: `rgb(255, 245, 238, 0.1)` };
        return (
          <Col s={4} key={i} id={e.id} style={changeDelColor}>
            <a className={favClassName}>
              <i
                className="material-icons"
                onClick={() => {
                  this.props.updateFav(e.id, e.favorite);
                  this.setFav();
                }}
              >
                {e.favorite ? "favorite" : "favorite_border"}
              </i>
            </a>
            <CardPanel
              className="teal lighten-4 black-text infoCards"
              onClick={() => this.saveID(e.id)}
            >
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
    });
  };

  render() {
    let delClassName = `btn-floating btn-large waves-effect waves-light red ${
      this.state.delID ? "" : "disabled"
    }`;

    return (
      <Row className="resultsRow">
        <Col className="s12 offset-s12">
          <a className={delClassName}>
            <i
              className="material-icons"
              onClick={() => {
                this.props.delInfo(this.state.delID);
                this.saveID();
              }}
            >
              delete_forever
            </i>
          </a>
        </Col>

        {this.renderValues()}
      </Row>
    );
  }
}

export default SavedResults;
