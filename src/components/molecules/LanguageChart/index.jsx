//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> Chart.js
// "Material Design for Bootstrap" is using chart.js to generate its charts
import { Polar } from "react-chartjs-2";

class LanguageChart extends React.Component {
  state = {
    dataPolar: {
      datasets: [
        {
          data: [300, 250, 100, 40],
          backgroundColor: [
            "rgba(247, 70, 74, 0.8)",
            "rgba(70, 191, 189, 0.8)",
            "rgba(253, 180, 92, 0.8)",
            "rgba(148, 159, 177, 0.8)"
          ],
          label: "Your top languages"
        }
      ],
      labels: ["JavaScript", "Python", "CSS", "Roff"]
    }
  }

  render() {
    return (
      <>
      <p className="lead font-weight-bold text-center mt-3">Your top languages</p>
      <Polar 
      className="w-100 h-auto"
      data={this.state.dataPolar}
      options={
        
        { 
          responsive: true,
        },
        {
          legend: {
              display: false
          }
        }
      }
      />
      </>
    );
  }
}

export default LanguageChart;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
