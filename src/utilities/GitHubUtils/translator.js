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

  // Generate platform.contribution.(?) and platform.repos.(?)
  Object.values(objUser.calendar).forEach(_c => {

    // Filters all calendars from the query
    if (_c.__typename == "ContributionsCollection") {
      
      var year = [];

      // Calculation of the total codeRevies
      var codeReviewsCount = 0;

      /** platform.contribution.years.stars.(?) */
      var stats = new Object();
      stats.commits = new Object();
      stats.issues = new Object();
      stats.pullRequests = new Object();
      stats.codeReviews = new Object();

      stats.commits.total = 0;
      stats.issues.total = 0;
      stats.pullRequests.total = 0;
      stats.codeReviews.total = 0;

      stats.streak = new Object();
      stats.streak.history = [];
      stats.streak.currentStreak = new Object();
      stats.streak.longestStreak = new Object();
      stats.streak.currentStreak.startDate = undefined;
      stats.streak.currentStreak.endDate = undefined;
      stats.streak.currentStreak.total = undefined;
      stats.streak.longestStreak.startDate = undefined;
      stats.streak.longestStreak.endDate = undefined;
      stats.streak.longestStreak.total = undefined;

      year.stats = stats;

      platform.contributions.years.push(year);
    }


  });

  return platform;
}



console.log(platform);
