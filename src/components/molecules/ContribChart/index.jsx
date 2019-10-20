import React from "react";
import { 
  Radar
} from "react-chartjs-2";

import {
  MDBContainer
} from "mdbreact";


class ChartsPage extends React.Component {
  state = {
    dataRadar: {
      labels: ["Code review", "Issues", "Pull request", "Commits"],
      datasets: [
        {
          label: "GitHub",
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgb(64, 120, 192)",
          data: [10, 15, 10, 70]
        },
        {
          label: "GitLab",
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgb(252, 198, 38)",
          data: [17, 30, 25, 44]
        }
      ]
    },
    dataRadarOptions: {
        responsive: true,
        elements: {
          line: {
            tension: 0
          }
        },
        legend: {
          display: true,
        },
        scale: {
          ticks: {
            beginAtZero: true,
            max: 100,
            min: 0,
            stepSize: 20
          }
        },
        scales: {
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                beginAtZero: true,
                display: false,
              }
            }]
        }
    }
  }


render() {
    return (
      <MDBContainer>
        <Radar 
        data={this.state.dataRadar}
        options={this.state.dataRadarOptions}
        />
      </MDBContainer>
    );
  }
}

export default ChartsPage;