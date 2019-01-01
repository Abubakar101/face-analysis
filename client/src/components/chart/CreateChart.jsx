import React, { Component } from "react";
import Charts from "./Charts";

class CreateChart extends Component {
  state = {
    beautyData: {
      id: "",
      type: "pie",
      labels: ["Male", "Female"],
      label: "Beauty Scores",
      values: []
    },
    emotionsData: {
      id: "",
      type: "doughnut",
      labels: [
        "Anger",
        "Disgust",
        "Fear",
        "Happiness",
        "Neutral",
        "Sadness",
        "Surprise"
      ],
      label: "Emotions",
      values: []
    }
  };

  componentDidMount() {
    this.addChartData(this.props.data, this.props.index);
  }

  addChartData = (elem, index) => {
    const beautyData = { ...this.state.beautyData };
    const emotionsData = { ...this.state.emotionsData };

    beautyData.id = `beautyScore_${index}`;
    beautyData.values = Object.values(elem.attributes.beauty);

    emotionsData.id = `emotionScore_${index}`;
    emotionsData.values = Object.values(elem.attributes.emotion);

    this.setState({ beautyData, emotionsData });
  };

  shouldRenderCharts = () =>
    this.state.beautyData.values.length > 0 &&
    this.state.emotionsData.values.length;

  render() {
    return (
      this.shouldRenderCharts() &&
      Object.keys(this.state).map((objKey, i) => {
        const chartData = this.state[objKey];

        return (
          <React.Fragment key={i}>
            <br />
            <h5>{chartData.label}</h5>
            {<Charts data={chartData} />}
          </React.Fragment>
        );
      })
    );
  }
}

export default CreateChart;
