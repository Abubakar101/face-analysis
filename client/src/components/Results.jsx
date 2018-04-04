import React, { Component } from "react";
import { Button, Col, Row, Card, CardPanel } from "react-materialize";
import Charts from "../Charts";

// import Result from "./Result";

class Results extends Component {
  //   renderValues = () => {
  //     return this.props.APIData.faces[0].attributes.map((e, i) => {
  //       return (
  //         <Col m={7} s={12}>
  //           <Card horizontal key={i} id={i}>
  //             <p>
  //               <span>Age: {e.age.value}</span>
  //               <span>Ethnicity: {e.ethnicity.value}</span>
  //               <span>Gender: {e.gender.value}</span>
  //             </p>
  //           </Card>
  //         </Col>
  //       );
  //     });
  //   };

createCanvas = (id, type,labels,label,data   ) => {
  return <Charts id={id} type={type} labels={labels} label={label} data={data}  />
}


  render() {
    console.log(this.props.APIData);

    return (
      <Row>
        <Col s={12}>
          <CardPanel className="teal lighten-4 black-text">
            <h6>Age: {this.props.APIData.age.value}</h6>
            <h6>Ethnicity: {this.props.APIData.ethnicity.value}</h6>
            <h6>Gender: {this.props.APIData.gender.value}</h6>
            
            




            {this.createCanvas("beautyScore","doughnut", ["Male", "Female"], "Male & Females Beauty Ratings", [
              this.props.APIData.beauty.male_score,
              this.props.APIData.beauty.female_score
            ])}

 
            {this.createCanvas("emotions", "bar", ["Anger", "Disgust", "Fear", "Happiness", "Neutral", "Sadness", "Surprise" ], "Emotions", [
              this.props.APIData.emotion.anger,
              this.props.APIData.emotion.disgust,
              this.props.APIData.emotion.fear,
              this.props.APIData.emotion.happiness,
              this.props.APIData.emotion.neutral,
              this.props.APIData.emotion.sadness,
              this.props.APIData.emotion.surprise
            ])}

            </CardPanel>
            </Col>
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
