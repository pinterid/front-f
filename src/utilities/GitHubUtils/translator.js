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

  return platform;
}



console.log(platform);
