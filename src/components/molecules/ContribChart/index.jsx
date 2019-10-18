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
          backgroundColor: "rgba(0, 126, 255, 0.3)",
          borderColor: "rgba(0,191,255, 0.5)",
          data: [28, 30, 60, 81]
        },
        {
          label: "GitLab",
          backgroundColor: "rgba(255, 153, 0, 0.3)",
          borderColor: "rgba(255,140,0,0.5)",
          data: [45, 35, 40, 19]
        }
      ]
    }

  }


render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Radar chart</h3>
        <Radar data={this.state.dataRadar} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;