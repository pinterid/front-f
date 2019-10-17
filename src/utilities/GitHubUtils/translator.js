// Import JSON structure
import {
  structure,
  organizations,
  members,
  contribution,
  repos,
  calendarEntry,
  yearEntry,
  history
} from "./Objects";

let base = null;

// Works what the structure assembles
export function getTranslatorObj(objUser) {
  //console.log(objUser);

  base = JSON.parse(JSON.stringify(structure))
  let stats;
  let streak = false;

  const submitToStreak = function(day){
    if(!streak){
      streak = true
      let shit = {...history}
      shit.startDate = day.date
      //console.log(shit)
      stats.streaks.history.unshift({...shit})

      //console.log(stats.streaks.history)
    }else{
      stats.streaks.history[0].endDate = day.date
    }
  }

  const genContributionDays = function*(year) {

    for (const [w, week] of year.contributionCalendar.weeks.entries()) {
      for (const [d, day] of week.contributionDays.entries()) {
        const cday = { ...calendarEntry };
        cday.date = day.date;
        cday.color = day.color
        cday.total = day.contributionCount;
        cday.week = w;
        cday.weekday = d;

        if (cday.total !== 0) {
          submitToStreak(day)
          stats.streaks.history[0].total++
          yield cday;
        } else {
          streak = false;
        }
      }
    }
  };

  const genContributionByRepositories = function*(yearContributionsByRepository) {
    for (const reposi of yearContributionsByRepository) {

      yield reposi.repository.defaultBranchRef.target.history.nodes.filter(
        contrib => (contrib.committer && contrib.committer.user && contrib.committer.user.login == objUser.profile.login)).map(_node => {
          let con = {...contribution};
          con.datetime = _node.committedDate;
          con.nameWithOwner = reposi.repository.nameWithOwner;
          con.repoUrl = reposi.repository.url;
          con.additions = reposi.repository.defaultBranchRef.target.additions;
          con.deletions = reposi.repository.defaultBranchRef.target.deletions;
          con.changedFiles = reposi.repository.defaultBranchRef.target.changedFiles;
          con.languages.count = reposi.repository.languages.totalCount;
          con.languages.size = reposi.repository.languages.totalSize;
          con.languages.edges = reposi.repository.languages.edges;
          return con;
      });
    }
  };

  const genContributionYears  = function*(calendar) {
    for (let c = 1; c < calendar.length; c++) {

      stats = {...yearEntry.stats}

      var commits = Array.from(genContributionByRepositories(objUser.calendar[`c${c}`].commitContributionsByRepository)).flat().reduce((h, obj) => {
        let date = obj.datetime.split("T")[0]
        return Object.assign(h, { [date]:( h[date] || [] ).concat(obj)})
      }, {})

      var issues = Array.from(genContributionByRepositories(objUser.calendar[`c${c}`].issueContributionsByRepository)).flat().reduce((h, obj) => {
        let date = obj.datetime.split("T")[0]
        return Object.assign(h, { [date]:( h[date] || [] ).concat(obj)})
      }, {})

      var pullRequests = Array.from(genContributionByRepositories(objUser.calendar[`c${c}`].pullRequestContributionsByRepository)).flat().reduce((h, obj) => {
        let date = obj.datetime.split("T")[0]
        return Object.assign(h, { [date]:( h[date] || [] ).concat(obj)})
      }, {})

      var contributionYear = JSON.parse(JSON.stringify(yearEntry));
      contributionYear.stats['commits'] = 0
      contributionYear.stats['issues'] = 0
      contributionYear.stats['pullRequests'] = 0
      contributionYear.stats['codeReviews'] = 0
      let dayEntry = null;
      for (const day of genContributionDays(objUser.calendar[`c${c}`])) {
        dayEntry = JSON.parse(JSON.stringify(calendarEntry));
        dayEntry.total = day.total
        dayEntry.week = day.week
        dayEntry.weekday = day.weekday
        //console.log(commits, issues)
        if(commits[day.date]){
          dayEntry.contributions.commits = commits[day.date]
          //contributionYear.stats['commits'] += commits[day.date].length
        }else if(issues[day.date]){
          dayEntry.contributions.issues = commits[day.date]
          //contributionYear.stats['issues'] += issues[day.date].length
        }else if(pullRequests[day.date]){
          dayEntry.contributions.pullRequests = commits[day.date]
          //contributionYear.stats['pullRequests'] += pullRequests[day.date].length
        }else{
          dayEntry.contributions.pullRequests = [null,]
          //contributionYear.stats['codeReviews'] += [null,].length
        }
        contributionYear.calendar[day.date] = JSON.parse(JSON.stringify(dayEntry))
      }
      

      contributionYear.stats.streaks.history = stats.streaks.history.filter(s => (s.endDate))
      contributionYear.stats.streaks.longestStreak = {...stats.streaks.history.reduce((a,b)=>a.total>b.total?a:b)}
      contributionYear.stats.streaks.currentStreak = {...stats.streaks.history[0]}

      
      if(!contributionYear.calendar){
        console.log(contributionYear)
        let bdarray = Object.values(contributionYear.calendar)
        contributionYear.stats.busiestDay = bdarray.reduce((a,b)=>a.total>b.total?a:b);
        contributionYear.stats.average = bdarray.reduce((a,b)=>a.total+b.total);
      
      }
      
      yield JSON.parse(JSON.stringify(contributionYear));
    }
  };

  const genRepositories = function*(calendar) {
    for (let c = 1; c < calendar.length; c++) {
      const reposi = objUser.calendar[`c${c}`].commitContributionsByRepository
        yield reposi.map( _repo => {
            //console.log(_repo);

            let rep = {...repos}
            rep.avatarUrl = null
            rep.name = _repo.repository.name
            rep.repoUrl = _repo.repository.url
            rep.owner = {...repos.owner}
            rep.owner.avatarUrl = _repo.repository.owner.avatarUrl
            rep.owner.login = _repo.repository.owner.login
            rep.owner.username = _repo.repository.owner.login
            rep.owner.url = _repo.repository.owner.url
            rep.languages = {...repos.languages}
            rep.languages.count = _repo.repository.languages.totalCount;
            rep.languages.size = _repo.repository.languages.totalSize;
            rep.languages.edges = _repo.repository.languages.edges;
            return rep;
        });
    }
  };

  /** platform.(?) */
  base.avatarUrl = objUser.profile.avatarUrl;
  base.websiteUrl = objUser.profile.websiteUrl;
  base.company = objUser.profile.company;
  base.email = objUser.profile.email;
  base.name = objUser.profile.name;
  base.createdAt = objUser.profile.createdAt;
  base.location = objUser.profile.location;

  if (objUser.profile.status) {
    base.status.message = objUser.profile.status.message;
    base.status.emojiHTML = objUser.profile.status.emojiHTML;
  } else {
    base.status.message = null;
    base.status.emojiHTML = null;
  }

  /** platform.organizations.(?) */
  let organization = JSON.parse(JSON.stringify(organizations))
  objUser.profile.organizations.edges.forEach(_org => {
    organization.avatarUrl = _org.node.avatarUrl;
    organization.name = _org.node.name;
    organization.orgUrl = _org.node.url;

    /** platform.organizations.member.(?) */
    let member = JSON.parse(JSON.stringify(members))
    _org.node.membersWithRole.nodes.forEach(_member => {
      member.avatarUrl = _member.avatarUrl;
      member.name = _member.name;
      member.webUrl = _member.url;
      organization.members.push(JSON.parse(JSON.stringify(member)));
    });
    base.organizations.push(JSON.parse(JSON.stringify(organization)));
  });

  base.contributions.years = Array.from(
    genContributionYears (Object.values(objUser.calendar))
  );

  base.repos = Array.from(
    genRepositories (Object.values(objUser.calendar))
  ).flat();

  return base;
}

//console.log(structure);
