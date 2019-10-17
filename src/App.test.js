// A tool to query data from github
import * as gitHub from "./utilities/GitHubUtils";

// Get GitHub data
const fetchDatafromGitHub = async () => {   
    let res = await gitHub.get("aichnerc");
    console.log(res)
    if(res.name !== "Aichner Christian"){
      console.error("Error fetching from GitHub.");
    } else {
      //console.log(res);
    }
    
    let res2 = await gitHub.get("kleberbaum");
    console.log(res2)
    if(res2.name !== "Florian Kleber"){
      console.error("Error fetching from GitHub.");
    } else {
      //console.log(res2);
    }
    
  };

fetchDatafromGitHub();

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
