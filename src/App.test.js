// A tool to query data from github
import * as gitHub from "./utilities/GitHubUtils";

// Get GitHub data
const fetchDatafromGitHub = async () => {   
    let res = await gitHub.get("torvalds");

    if(res.name !== "Linus Torvalds"){
      console.error("Error fetching from GitHub.");
    } else {
      console.log(res);
    }
    
  };

fetchDatafromGitHub();

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
