import React, { Component } from "react";
import Chart from "chart.js";

class Charts extends Component {
  state = {
    style: { width: `300px`, height: `300px` }
  };

  componentDidMount() {
    this.fillData(this.props.data);
  }

  fillData = data => {
    var ctx = document.getElementById(data.id);
    new Chart(ctx, {
      type: data.type,
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            data: data.values,
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#003153",
              "#18453B",
              "#E9692C"
            ]
          }
        ]
      },
      options: {
        animation: {
          animateScale: true
        }
      }
    });
  };

  render() {
    return (
      <div>
        <canvas id={this.props.data.id} style={this.state.style} />
      </div>
    );
  }
}

export default Charts;
