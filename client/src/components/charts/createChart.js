import React from "react";
import Charts from "../../Charts";

const data = {
  beautyData: {
    id: "beautyScore_",
    type: "pie",
    labels: ["Male", "Female"],
    label: "Male & Females Beauty Ratings",
    data: []
  },
  emotionsData: {
    id: "emotionScore_",
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
    data: []
  }
};

const addChartData = (e, i) => {
  data.beautyData.id = data.beautyData.id + i;
  data.beautyData.data = Object.values(e.attributes.beauty);

  data.emotionsData.id = data.emotionsData.id + i;
  data.emotionsData.data = Object.values(e.attributes.emotion);
};

const renderCharts = (e, i) => {
  addChartData(e, i);

  return Object.keys(data).map((objKey, i) => {
    const chartData = data[objKey];
    const titles = ["Beauty Scores", "Emotions"];

    return (
      <React.Fragment key={i}>
        <br />
        <h5>{titles[i]}</h5>
        {<Charts data={chartData} />}
      </React.Fragment>
    );
  });
};

export default renderCharts;
