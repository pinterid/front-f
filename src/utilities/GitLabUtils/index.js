// Import JSON structure
import { structure, organizations, members, contribution} from "./objects";
let data = structure;

//get Json data file
export const get = (server, username) => {
  data.platformUrl = server;
  // getContributions(server, username);
  getOrganizations(server, username)
  .then(res => {
    data.organizations = res;
    return data;
  });
  const contribs = getContributions(server, username)
  console.log(contribs)
  return data;
};

// Fetch JSON from url
const fetchJson = (urlIn) => {
  const proxy = "https://c-hive-proxy.herokuapp.com/";
  
  const url = `${proxy}${urlIn}`;
  return fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then(async res => await res.json())
  .then(res => {return res})
}

// Fetch HTML from url
const fetchHtml = (urlIn) => {
  const proxy = "https://c-hive-proxy.herokuapp.com/";
  
  const url = `${proxy}${urlIn}`;
  return fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then(async res => await res.text())
  .then(res => {return res})
}

// Get all Organizations a user is in
const getOrganizations = (server, username) => {
  const limit = "2147483647";

  const url = `https://${server}/users/${username}/groups.json?limit=${limit}`;
  return parseJsonToDOM(fetchJson(url))
  .then(res => {
    const raw = res.getElementsByClassName("group-row");
    let temp = [];
    Array.from(raw).forEach(org => {
      let orgObj = JSON.parse(JSON.stringify(organizations));
      if(org.innerHTML.includes("<img")){
        const img = org.getElementsByClassName("avatar").item(0);
        orgObj.avatarUrl = img.dataset.src;
      }
      const groupNameLink = org.getElementsByClassName("group-name").item(0);

      orgObj.name = groupNameLink.innerHTML;
      orgObj.orgUrl = groupNameLink.pathname;
      getGroupMembers(orgObj.orgUrl, server)
      .then(res => {
        orgObj.members = res;
      });
      temp.push(orgObj);
    });
    return temp;
  });
}
// Get all Group Members from Group
const getGroupMembers = (name, server) => {
  const url = `https://${server}/groups${name}/-/group_members`;
  return parseTextToDOM(fetchHtml(url))
  .then(res => {
    const raw = res.getElementsByClassName("list-item-name");
    let temp = [];
    Array.from(raw).forEach(item => {
      let membersObj = JSON.parse(JSON.stringify(members));
      const img = item.getElementsByClassName("avatar").item(0);
      const userLink = item.getElementsByClassName("member").item(0);
      const userSpan = userLink.nextElementSibling
      membersObj.avatarUrl = img.dataset.src;
      membersObj.name = userLink.innerHTML;
      membersObj.username = userSpan.innerHTML.substring(1);
      membersObj.webUrl = userLink.pathname;
      temp.push(membersObj);
    });
    return temp;
  });
}

// Parse Json to DOM Object
const parseJsonToDOM = (json) => {
  const parser = new DOMParser()
  const html = json
  .then(res => {
    return parser.parseFromString(res.html, "text/html");
  });
  return html;
}

//Parse plain text to DOM Object
const parseTextToDOM = (json) => {
  const parser = new DOMParser()
  const html = json
  .then(res => {
    return parser.parseFromString(res, "text/html");
  });
  return html;
}

const getContributions = (server, username) => {
  const limit = "2147483647";

  const url = `https://${server}/${username}?limit=${limit}`
  const html = parseJsonToDOM(fetchJson(url));
  let commits = [];
    let issues = [];
    let pullRequests = [];
  const contribs = html
  .then(res => {
    let commits = getCommits(res);
    let issues = getIssues(res);
    let pullRequests = getPullRequests(res);

    //console.log(commits)
  });
  //console.log(contribs)
  return {"commits": commits, "issues": issues, "pullRequests": pullRequests};
}

// Convert HTML formatted event-items to contributions

const convertToContributions = (items) => {
  let contributions = {}
  let contrib = null;

  items.forEach(element => {
    contrib = Object.assign({}, contribution);
    var time = element.getElementsByTagName('time')[0].getAttribute("datetime");
    var nameWithOwner = element.getElementsByClassName('event-scope')[0].getElementsByTagName('a')[0].getAttribute("href");

    contrib.time = time.split("T")[1]
    contrib.nameWithOwner = nameWithOwner
    contrib.repoUrl = `${data.platformUrl}${nameWithOwner}`

    contributions[time.split("T")[0]] = contrib
  });
  return contributions
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
  console.log(convertToContributions(commits))
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
  console.log(convertToContributions(issues))
  return issues;
}

// Get all Pull Requests from DOM Object
const getPullRequests = (html) => {
  const activities = html.getElementsByClassName("event-item");
  let pullRequests = [];
  Array.from(activities).forEach(a => {
    if(a.innerHTML.includes("Merge branch")){
      pullRequests.push(a);
    }
  });
  console.log(convertToContributions(pullRequests))
  return pullRequests;
} 
