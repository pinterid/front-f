// A tool to query data from github
import * as gitHub from "./utilities/GitHubUtils";

// Get GitHub data
const fetchDatafromGitHub = async () => {   
    let res = await gitHub.get("torvalds");
    if(res){
      console.log(res);
    } else {
      console.log("Error fetching from GitHub.");
    }
  };

fetchDatafromGitHub();

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */