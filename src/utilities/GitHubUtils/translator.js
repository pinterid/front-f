// The structure what the user gets 
var platform = require("./platformStructure.json");

// Works what the structure assembles
export function getTranslatorObj(objUser) {

  /** platform.(?) */
  platform.platformName = "GitHub";
  platform.platformUrl = "https://github.com";
  platform.avatarUrl = objUser.profile.avatarUrl;
  platform.websiteUrl = objUser.websiteUrl;
  platform.company = objUser.profile.company;
  platform.email = objUser.profile.email;
  platform.name = objUser.profile.name;
  platform.createdAt = objUser.profile.createdAt;
  platform.location = objUser.profile.location;
  
  if (objUser.profile.status) {
    platform.status.message = objUser.profile.status.message;
    platform.status.emojiHTML = objUser.profile.status.emojiHTML;
  } else {
    platform.status.message = "null";
    platform.status.emojiHTML = "null";
  }

  /** platform.organizations.(?) */
  objUser.profile.organizations.edges.forEach(_org => {

    var org = [];

    org.members = [];
    org.avatarUrl = _org.node.avatarUrl;
    org.name = _org.node.name;
    org.orgUrl = _org.node.url;

    /** platform.organizations.member.(?) */
    _org.node.membersWithRole.nodes.forEach(_member => {
      var member = [];

      member.avatarUrl = _member.avatarUrl;
      member.name = _member.name;
      member.username = null;
      member.webUrl = _member.url;

      org.members.push(member);
    });
    platform.organizations.push(org);
  });

  return platform;
}



console.log(platform);
