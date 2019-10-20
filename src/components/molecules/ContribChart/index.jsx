import React from "react";
import { 
  Radar
} from "react-chartjs-2";

import {
  MDBContainer
} from "mdbreact";

//> Dummy data
const data = [
  {
    source: "GitHub",
    background: "rgba(51,51,51,0)",
    border: "rgba(51,51,51,.4)",
    data: [10, 15, 15, 70]
  },
  {
    source: "GitLab",
    background: "rgba(226,67,41,0)",
    border: "rgba(226,67,41,.4)",
    data: [17, 30, 25, 44]
  }
];

class ChartsPage extends React.Component {

  state={
    dataRadar: {
      labels: ["Loading"],
      datasets: [{
        label: "Loading"
      }]
    }
  }

  componentDidMount = () => {
    this.setState({
      dataRadar: {
        labels: ["Code review", "Issues", "Pull request", "Commits"],
        datasets: this.calculateSources()
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
    })
  }

  calculateSources = () => {
    let totalReviews = 0, totalIssues = 0, totalRequests = 0, totalCommits = 0, totalSources = 1;

    // Get data points for all sources
    let results = data.map((source, i) => {
      totalReviews += source.data[0];
      totalIssues += source.data[1];
      totalRequests += source.data[2];
      totalCommits += source.data[3];

      totalSources += i;

      return {
          label: source.source,
          backgroundColor: source.background,
          borderColor: source.border,
          data: source.data
      }
    });

    // Calculate averages
    let avgReviews, avgIssues, avgRequests, avgCommits;

    avgReviews = parseInt(totalReviews) / parseInt(totalSources);
    avgIssues = parseInt(totalIssues) / parseInt(totalSources);
    avgRequests = parseInt(totalRequests) / parseInt(totalSources);
    avgCommits = parseInt(totalCommits) / parseInt(totalSources);

    // Create average data points
    results.push({
      label: "Average",
      backgroundColor: "rgba(33, 181, 33, .7)",
      borderColor: "rgba(33, 181, 33, .3)",
      data: [
        avgReviews,
        avgIssues,
        avgReviews,
        avgCommits
      ]
    });

    return results;
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