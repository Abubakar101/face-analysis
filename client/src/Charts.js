import Chart from "chart.js";
import React, { Component } from "react";

class Charts extends Component {
  componentDidMount() {
    this.createChart();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.APIData != nextProps) {
  //     return true;
  //   }
  //   return false;
  // }

  createChart = (id, type, labels, label, data) => {
    console.log(this.props)
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
              "#c45850"
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.props.label
        }
      }
    });
  };

  render() {
    return (
      <div>
        <canvas id={this.props.id} style={{width:`300px`, height:`300px` }} />
      </div>
    );
  }
}

export default Charts;
