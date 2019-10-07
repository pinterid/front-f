export const get = (server, username) => {
  parseJsonToDOM(fetchJson(server, username));
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
  console.log(html);
}
