import Chart from "chart.js";
import React, { Component } from "react";

class Charts extends Component {
  componentDidMount() {
    this.createChart();
  }

  createChart = (id, type, labels, label, data) => {
    var ctx = document.getElementById(this.props.id);
    new Chart(ctx, {
      type: this.props.type,
      data: {
        labels: [...this.props.labels],
        datasets: [
          {
            label: this.props.label,
            data: [...this.props.data],
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
        <canvas
          id={this.props.id}
          style={{ width: `300px`, height: `300px` }}
        />
      </div>
    );
  }
}

export default Charts;
