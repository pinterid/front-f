
// Import JSON structure
import { structure, organizations, members, contribution, repos, calendarEntry, yearEntry} from "./objects";
// Import clonedeep
var cloneDeep = require("lodash.clonedeep")
let data = structure;

//> Helper functions
// Get calendar week from date
Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};
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
        no[k] = o[k]
      }
  });
  return no
};


//> Member functions
// Get a member object by username
const getMember = async (username) => {
  var member = null;
  
  const url = `https://${data.platformUrl}/${username}`
  return await parseTextToDOM(fetchHtml(url)).then(html => {
    member = Object.assign({}, members);
    const avatarUrl = html.getElementsByClassName("avatar-holder")[0].getElementsByTagName('a')[0].getAttribute('href');
    const name = html.getElementsByClassName("cover-title")[0].innerHTML;

    member.name = name
    member.username = username
    member.avatarUrl = `https://${data.platformUrl}/${avatarUrl.substring(1)}`;
    member.webUrl = `https://${data.platformUrl}/${username}`

    return member
  });
}
// Get a list of members of a gitlab memberlist
const getMembers = async (path) => {
  const url = `https://${data.platformUrl}/${path}`
  //console.log(url)
  let users = []
    return parseTextToDOM(fetchHtml(url)).then(async html => {
      const elements = html.getElementsByClassName("user-info")
      Array.from(elements).forEach(async element => {
        let username =  element.getElementsByTagName("a")[0].getAttribute('href').substring(1);
        //console.log(username)
        //console.log(getMember(username))
        let member = await getMember(username)
        //console.log(member)
        users.push(member)
        //console.log(users)
      })
      return users
    });
}

//> Parser functions
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

//> Send request functions
// Fetch JSON from url
const fetchJson =  (urlIn) => {
  const proxy = "https://c-hive-proxy.herokuapp.com/";
  
  const url = `${proxy}${urlIn}`;
  return  fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then( res =>  res.json())
  .then(res => {return res})
}
// Fetch HTML from url
const fetchHtml =  (urlIn) => {
  const proxy = "https://c-hive-proxy.herokuapp.com/";
  
  const url = `${proxy}${urlIn}`;
  return  fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      //"X-Requested-With": "XMLHttpRequest"
    }
  })
  .then( res =>  res.text())
  .then(res => {return res})
}

//get Json data file
export const get = (server, username) => {

  const fillStructure = (base) => {
    // Fill profile of a user
    const fillProfile =  () => {
      const url = `https://${base.platformUrl}/${username}`;
      parseTextToDOM(fetchHtml(url)).then(html => {
        //console.log(html)
        const status = html.getElementsByTagName("gl-emoji")[0];
        const coverDesc =  html.getElementsByClassName("cover-desc")[0].getElementsByTagName("span");
        const coverTitle =  html.getElementsByClassName("cover-title")[0];
        const avatarUrl = html.getElementsByClassName("avatar-holder")[0].getElementsByTagName('a')[0].getAttribute('href');
        const links = html.getElementsByClassName("profile-link-holder")
        const message = null;
        const emojiHTML = null;
        const username = coverDesc[0].innerHTML.trim().substring(1);
        const date = coverDesc[1].innerHTML;

        if(links[0]){
          base.websiteUrl = links[0].getElementsByTagName("a")[0].getAttribute("href").split(":")[1];
        }
        if(links[2]){
          base.email = links[2].getElementsByTagName("a")[0].getAttribute("href");
        }
        if(links[3]){
          base.location = links[3].innerText.trim();
        }
        if(links[4]){
          base.company = links[4].innerText.trim();
        }
        if(status){
          base.status.message = status.innerHTML;
          base.status.emojiHTML = status.outerHTML;
        }

        base.avatarUrl = `https://${data.platformUrl}/${avatarUrl.substring(1)}`;

        base.username = username;
        base.name = coverTitle.innerHTML.trim();
        base.createdAt = new Date(date);

      });
    }
    // Fill all Organizations a user is in into structure
    const fillOrganizations =  async () => {
      const url = `https://${base.platformUrl}/users/${username}/groups.json`;
      //console.log(url)
      let orgs = []
      parseJsonToDOM(fetchJson(url)).then(async html => {
        let org = null
        const rows = html.getElementsByClassName("group-row");

        for (const _org of Array.from(rows)){
          org = Object.assign({}, organizations)
          
          const avatarUrl = _org.getElementsByClassName("avatar")[0].getAttribute("data-src");
          const name = _org.getElementsByClassName("group-name")[0].getAttribute("href");

          if (avatarUrl){
            org.avatarUrl = `https://${base.platformUrl}/${avatarUrl.substring(1)}`
          }
          org.name = `${name.substring(1)}`
          org.orgUrl = `https://${base.platformUrl}/${name.substring(1)}`
          org.members = await getMembers(`groups/${org.name}/-/group_members`)
          //console.log(await getMembers(`groups/${org.name}/-/group_members`))
          orgs.push(org)
          //console.log(org)
        }
      })
      base.organizations = orgs
    }
    // Fill all contributions and repositories
    const fillContributions = async () => {

      //> Repositories
      // Get a repository from a given
      const getRepositoryFromName = async (nameWithOwner) => {
        let repo = Object.assign({}, repos);
        repo.repoUrl = `https://${data.platformUrl}/${nameWithOwner}`
        repo.avatarUrl = `https://${data.platformUrl}/${nameWithOwner}/-/avatar`
        repo.name = nameWithOwner
      
        //let owner = await getMember(nameWithOwner)
      
        //repo.owner = owner
        repo.members = await getMembers(`${repo.name}/-/project_members`)
        //console.log(repo.members)
        return repo
      }

      //> Contributions
      // Convert HTML formatted event-items to contributions
      const convertToContributions = async (items) => {
        let contributions = {}
        let contrib = null;
        for(const element of items){
          contrib = Object.assign({}, contribution);
          var time = element.getElementsByTagName('time')[0].getAttribute("datetime");
          var nameWithOwner = element.getElementsByClassName('event-scope')[0].getElementsByTagName('a')[0].getAttribute("href");
          //log(nameWithOwner)
          contrib.time = time.split("T")[1]
          contrib.nameWithOwner = nameWithOwner.substring(1)
          //console.log(contrib.nameWithOwner)
          contrib.repoUrl = `https://${data.platformUrl}/${contrib.nameWithOwner}`

          if(!contributions[time.split("T")[0]]){
            contributions[time.split("T")[0]] = []
          }
          contributions[time.split("T")[0]].push(contrib)

          let repo = await getRepositoryFromName(contrib.nameWithOwner)
          pushWithoutElem(data.repos,repo)
        };

        return contributions
      }
      // Get all Commits from DOM Object
      const getCommits = (html) => {
        const activities = html.getElementsByClassName("event-item");
        //console.log(activities)
        let commits = [];
        for (const a of Array.from(activities)){
          if(a.innerHTML.includes("pushed to branch")){
            commits.push(a);
          }
        }
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

      const limit = "2147483647";
      const url = `https://${base.platformUrl}/${username}?limit=${limit}`
    

      let _years = []
      var year = null
      const years = await parseJsonToDOM(fetchJson(url)).then(async res => {
      let commits = await getCommits(res)
      let issues = await getIssues(res)
      let pullRequests = await getPullRequests(res)
        
        
      let today = new Date();
      
      for (let currentYear = base.createdAt.getFullYear(); currentYear <= today.getFullYear(); currentYear++) {
        let year = cloneDeep(yearEntry);
        console.log(year)
        let contributionsPerYear = (contributions) => {return (keyMatch(contributions,new RegExp('^' + currentYear)))};
        console.log(currentYear)

        let fill = (contributionsPerYear, type) => {
          for (let [key, contributionGroup] of Object.entries(contributionsPerYear)){
            //cEntry = Object.assign({}, calendarEntry)
            let cEntry = null
            if (!year.calendar[key]){
              cEntry = cloneDeep(calendarEntry);
            }else{
              cEntry = year.calendar[key];
            }
  
            
            cEntry.week = new Date(key).getWeekNumber()
            cEntry.weekday = new Date(key).getDay()
            console.log(key, contributionGroup)
  
            for (let [cKey, contribution] of Object.entries(contributionGroup)){
              cEntry.contributions[`${type}`].push(contribution);
              cEntry.total++;
            }
            console.log(cEntry)
            year.calendar[key] = cEntry;
          }
        }

        fill(contributionsPerYear(commits), 'commits')
        fill(contributionsPerYear(issues), 'issues')
        fill(contributionsPerYear(pullRequests), 'pullRequests')

        
        /*
        for (let [key, commits] of Object.entries(contributionsPerYear(commits))) {
          cEntry = Object.assign({}, calendarEntry)
          cEntry.week = new Date(key).getWeekNumber()
          cEntry.weekday = new Date(key).getDay()
          for (let [key2, c] of Object.entries(commits)){
            
            cEntry.contributions.commits.push(c)
            //console.log([key2,c])
            cEntry.total++;
          }
          //console.log([key, cEntry])
          console.log(year.)
        }
        */
        _years.push(year)
        

        //console.log(keyMatch(commits,/^currentYear/))
      }
      //console.log(commits)
      //console.log(issues)
      //console.log(pullRequests)

      return _years
    })
    console.log(years)
    
  }

    base.platformUrl = server;

    fillProfile();
    fillOrganizations();
    fillContributions();

    return base
  }

  
  /*
  .then(res => {
    data.organizations = res;
    return data;
  });
  */
  //const contribs = getContributions(server, username)
  return fillStructure(data);
};





