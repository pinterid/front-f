// Import JSON structure
import { structure, organizations, members, contribution, repos} from "./objects";
let data = structure;

//get Json data file
export const get = (server, username) => {
  data.platformUrl = server;
  data.organizations = getOrganizations(username);
  getProfile(username)
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

// Returns an object containing only those objects whose key matched the regex
var keyMatch = function(o,r){
  var no = {};
  Object.keys(o).forEach(function(k){
      if(r.test(k)){
        no[k] = o
      }
  });
  return no
};

// Get profile of a user
const getProfile = (username) => {
  var profile = {}
  const url = `https://${data.platformUrl}/${username}`;
  parseTextToDOM(fetchHtml(url)).then(html => {
    console.log(html)
    const status = html.getElementsByTagName("gl-emoji")[0];
    const cover =  html.getElementsByClassName("cover-desc")[0].getElementsByTagName("span");
    const avatarUrl = html.getElementsByClassName("avatar-holder")[0].getElementsByTagName('a')[0].getAttribute('href');
    const links = html.getElementsByClassName("profile-link-holder")
    const message = null;
    const emojiHTML = null;
    const username = cover[0].innerHTML.trim().substring(1);
    const date = cover[1].innerHTML;

    if(links[0]){
      profile.websiteUrl = links[0].getElementsByTagName("a")[0].getAttribute("href").split(":")[1];
    }
    if(links[2]){
      profile.email = links[2].getElementsByTagName("a")[0].getAttribute("href");
    }
    if(links[3]){
      profile.location = links[3].innerText.trim();
    }
    if(links[4]){
      profile.company = links[4].innerText.trim();
    }
    if(status){
      profile.message = status.innerHTML;
      profile.emojiHTML = status.outerHTML;
    }

    profile.avatarUrl = `https://${data.platformUrl}/${avatarUrl.substring(1)}`;

    profile.username = username;
    profile.createdAt = new Date(date);

    console.log(profile)
  });
  return profile
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
        org.avatarUrl = `https://${data.platformUrl}/${avatarUrl.substring(1)}`
      }
      org.name = `${name.substring(1)}`
      org.orgUrl = `https://${data.platformUrl}/${name.substring(1)}`
      org.members = getMembers(`${org.name}/-/group_members`)
      orgs.push(org)
      //console.log(org)
    })
    //console.log(html)
  })
  return orgs
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
    member.avatarUrl = `https://${data.platformUrl}/${avatarUrl.substring(1)}`;
    member.webUrl = `https://${data.platformUrl}/${username}`

  });
  return member
}

const getMembers = (path) => {
  const url = `https://${data.platformUrl}/${path}`
  let users = []
  parseTextToDOM(fetchHtml(url)).then(html => {
    const elements = html.getElementsByClassName("project_member")
 
    Array.from(elements).forEach(element => {
      let username = element.getElementsByClassName("user-info")[0].querySelector("span.cgray").innerHTML;
      username = username.substring(1);
      users.push(getMember(username))
    });
  });
  return users
}

const getRepositoryFromName = (nameWithOwner) => {
  let repo = Object.assign({}, repos);
  repo.repoUrl = `https://${data.platformUrl}/${nameWithOwner}`
  repo.avatarUrl = `https://${data.platformUrl}/${nameWithOwner}/-/avatar`
  repo.name = nameWithOwner

  let owner = getMember(nameWithOwner.split("/")[1])

  repo.owner = owner
  repo.members = getMembers(`${repo.name}/-/project_members`)
  //console.log(repo.members)
  return repo
}

const getContributions = (server, username) => {
  const limit = "2147483647";
  const url = `https://${data.platformUrl}/${username}?limit=${limit}`

  parseJsonToDOM(fetchJson(url)).then(res => {
    let commits = getCommits(res)
    let issues = getIssues(res)
    let pullRequests = getPullRequests(res)

    //console.log(commits)
    //console.log(issues)
    //console.log(pullRequests)


    //console.log(keyMatch(commits,/^2018/))
  })
  //console.log(contribs)
  return null
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
    contrib.nameWithOwner = nameWithOwner.substring(1)
    contrib.repoUrl = `https://${data.platformUrl}/${contrib.nameWithOwner}`

    contributions[time.split("T")[0]] = contrib

    let repo = getRepositoryFromName(nameWithOwner)
    pushWithoutElem(data.repos,repo)
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
  return convertToContributions(commits);
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
  return convertToContributions(issues);
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
  return convertToContributions(pullRequests);
}
