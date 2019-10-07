export const get = (server, username) => {
  getContributions(parseJsonToDOM(fetchJson(server, username)));
};

// Fetch Activities from GitLab in JSON format
const fetchJson = (server, username) => {
  const limit = "2147483647"
  const proxy = "https://c-hive-proxy.herokuapp.com/"
  
  const url = `${proxy}https://${server}/${username}?limit=${limit}`
  return fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then(async res => await res.json())
  .then(res => {return res})
}

// Parse plain text to DOM Object
const parseJsonToDOM = (json) => {
  const parser = new DOMParser()
  const html = json
  .then(res => {
    return parser.parseFromString(res.html, "text/html");
  });
  return html;
}

// Get all Contributions from DOM Object
const getContributions = (html) => {
  const contribs = html
  .then(res => {
    let temp = [];
    temp.push(getCommits(res));
    temp.push(getIssues(res));
  });
  return contribs;
}

// Get all Commits from DOM Object
const getCommits = (html) => {
  const activities = html.getElementsByClassName("event-item");
  let commits = [];
  Array.from(activities).forEach(a => {
    if(a.innerHTML.includes("pushed to branch")){
      commits.push(a);
    }
  });
  return commits;
}

// Get all Issues from DOM Object
const getIssues = (html) => {
  const activities = html.getElementsByClassName("event-item");
  let issues = [];
  Array.from(activities).forEach(a => {
    if(a.innerHTML.includes("opened")){
      issues.push(a);
    }
  });
  console.log(issues);
  return issues;
}