export const get = (server, username) => {
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
};