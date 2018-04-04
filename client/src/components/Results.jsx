import React, { Component } from "react";
import { Button, Col, Row, Card, CardPanel } from "react-materialize";
import Charts from "../Charts";


class Results extends Component {
  createCanvas = (id, type,labels,label,data   ) => {
    return <Charts id={id} type={type} labels={labels} label={label} data={data}  />
  }

    renderValues = () => {
      return this.props.APIData.map((e, i) => {
        return (
          <Col s={12} key={i}>
          <CardPanel className="teal lighten-4 black-text">
            <h6>Age: {e.age.value}</h6>
            <h6>Ethnicity: {e.ethnicity.value}</h6>
            <h6>Gender: {e.gender.value}</h6>

            {this.createCanvas("beautyScore","doughnut", ["Male", "Female"], "Male & Females Beauty Ratings", [
              e.beauty.male_score,
              e.beauty.female_score
            ])}

            {this.createCanvas("emotion", "bar", ["Anger", "Disgust", "Fear", "Happiness", "Neutral", "Sadness", "Surprise" ], "Emotions", [
              e.emotion.anger,
              e.emotion.disgust,
              e.emotion.fear,
              e.emotion.happiness,
              e.emotion.neutral,
              e.emotion.sadness,
              e.emotion.surprise
            ])}

            </CardPanel>
            </Col>
        );
      });
    };




  render() {
    console.log(this.props.APIData);

    return (
      <Row>
      {this.renderValues()}
      </Row>
    );
  }
}

export default Results;

// <span>{this.props.APIData.beauty.male_score}</span>
// <span>{this.props.APIData.beauty.female_score}</span>
// {
//   this.props.APIData ? this.renderValues : "Loaidng";
// }

// <Row>
//           {(this.props.showResults) ? this.props.APIData.faces[0].attributes.map((e, i) => {
//             console.log(e);
//             return (
//               <Col m={7} s={12}>
//                 <Card horizontal key={i} id={i}>
//                   <p>
//                     <span>Age: {e.age.value}</span>
//                     <span>Ethnicity: {e.ethnicity.value}</span>
//                     <span>Gender: {e.gender.value}</span>
//                   </p>
//                 </Card>
//               </Col>
//             );
//           }): ""}
//         </Row>
