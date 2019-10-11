// Import JSON structure
import { structure, organizations, members, contribution, repos} from "./objects";
let data = structure;

//get Json data file
export const get = (server, username) => {
  data.platformUrl = server;
  // getContributions(server, username);
  data.organizations = getOrganizations(username);
  /*
  .then(res => {
    data.organizations = res;
    return data;
  });
  */
  const contribs = getContributions(server, username)
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
      //"X-Requested-With": "XMLHttpRequest"
    }
  })
  .then(async res => await res.text())
  .then(res => {return res})
}

// Push element to a list without allowing duplicates
function pushWithoutElem(array, elem) {
  array.forEach( e => {
      if (e.name == elem.name){
          var index = array.indexOf(e);
          if (index > -1) {
              array.splice(index, 1);
          }
      }
  })
  array.push(elem)
}

// Get all Organizations a user is in
const getOrganizations = (username) => {

  const url = `https://${data.platformUrl}/users/${username}/groups.json`;
  let orgs = []
  parseJsonToDOM(fetchJson(url)).then(html => {
    
    let org = null
    const rows = html.getElementsByClassName("group-row");
    Array.from(rows).forEach(_org => {
      org = Object.assign({}, organizations)
      const avatarUrl = _org.getElementsByClassName("avatar")[0].getAttribute("data-src");
      const name = _org.getElementsByClassName("group-name")[0].getAttribute("href");

      if (avatarUrl){
        org.avatarUrl = `https://${data.platformUrl}/${avatarUrl.split("/")[1]}`
      }
      org.name = `${name.split("/")[1]}`
      org.orgUrl = `https://${data.platformUrl}/${name.split("/")[1]}`
      orgs.push(org)
      //console.log(org)
    })
    //console.log(html)
  })
  return orgs
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

const getMember = (username) => {
  let member = Object.assign({}, members);
  
  const url = `https://${data.platformUrl}/${username}`
  parseTextToDOM(fetchHtml(url)).then(html => {
    const avatarUrl = html.getElementsByClassName("avatar-holder")[0].getElementsByTagName('a')[0].getAttribute('href');
    const name = html.getElementsByClassName("cover-title")[0].innerHTML;

    member.name = name
    member.username = username
    member.avatarUrl = `https:/${avatarUrl}`;
    member.webUrl = `https://${data.platformUrl}/${username}`

  });
  return member
}

const getProjectMembers = (project) => {
  const url = `https://${data.platformUrl}/${project}/-/project_members`
  let users = []
  parseTextToDOM(fetchHtml(url)).then(html => {
    const elements = html.getElementsByClassName("project_member")
 
    Array.from(elements).forEach(element => {
      let username = element.getElementsByClassName("user-info")[0].querySelector("span.cgray").innerHTML;
      username = username.split("@")[1];
      users.push(getMember(username))
    });
  });
  return users
}

const getRepositoryFromName = (nameWithOwner) => {
  let repo = Object.assign({}, repos);
  repo.repoUrl = `https://${data.platformUrl}${nameWithOwner}`
  repo.avatarUrl = `https://${data.platformUrl}${nameWithOwner}/-/avatar`
  repo.name = nameWithOwner

  let owner = getMember(nameWithOwner.split("/")[1])

  repo.owner = owner
  repo.members = getProjectMembers(repo.name)
  //console.log(repo.members)
  return repo
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

    let repo = getRepositoryFromName(nameWithOwner)
    pushWithoutElem(data.repos,repo)
    //console.log(data.repos)
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
  //console.log(convertToContributions(issues))
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
  //console.log(convertToContributions(pullRequests))
  return pullRequests;
}
