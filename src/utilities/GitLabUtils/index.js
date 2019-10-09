// Import JSON structure
import { structure, organizations, members} from "./objects";
let data = structure;

//get Json data file
export const get = (server, username) => {
  data.platformUrl = server;
  // getContributions(server, username);
  return getOrganizations(server, username)
  .then(res => {
    data.organizations = res;
    return data;
  });
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
