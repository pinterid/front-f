import * as insert from '../../Database/Statements/Insert';
var alasql = require('alasql');
let streak = false;
let streakStart = "";
let streakTotal = 0;

export const fillDB = (objUser) => {
  console.log(objUser)
  fillPlatform(objUser);
  fillOrganization(objUser);
  fillStats(objUser);
}

const getBusiestDay = (year) => {
  let busiestDay = null;
  year.forEach((day) => {
    if(busiestDay == null){
      busiestDay = day;
    }
    else{
      if(day.contributionCount > busiestDay.contributionCount){
        busiestDay = day;
      }
    }
  })
  return busiestDay;
}

const fillPlatform = (objUser) => {
  // status
  let statusMessage;
  let statusEmojiHTML;
  
  if (objUser.profile.status) {
    statusMessage = objUser.profile.status.message;
    statusEmojiHTML = objUser.profile.status.emojiHTML;
  } else {
    statusMessage = null;
    statusEmojiHTML = null;
  }

  // base
  const avatarUrl = objUser.profile.avatarUrl;
  const websiteUrl = objUser.profile.websiteUrl;
  const company = objUser.profile.company;
  const email = objUser.profile.email;
  const fullName = objUser.profile.name;
  const createdAt = objUser.profile.createdAt;
  const location = objUser.profile.location;

  alasql(insert.platform,[
    "GitHub", 
    "https://github.com",
    avatarUrl,
    websiteUrl,
    company,
    email,
    fullName,
    createdAt,
    location,
    statusMessage,
    statusEmojiHTML
  ]);
}

const fillOrganization = (objUser) => {
  objUser.profile.organizations.edges.forEach(_org => {
    const avatarUrl = _org.node.avatarUrl;
    const name = _org.node.name;
    const url = _org.node.url;
    alasql(insert.organization,[
      avatarUrl,
      name,
      url
    ]);

    const organization_id = alasql('SELECT id FROM organization').pop()['id'];
    const platform_id = alasql('SELECT id FROM platform').pop()['id'];
  
    alasql(insert.platform_has_organization,[
      platform_id,
      organization_id
    ]);
    _org.node.membersWithRole.nodes.forEach(_member => {
      const memberAvatarUrl = _member.avatarUrl;
      const memberName = _member.name;
      const memberWebUrl = _member.url;
      const memberUsername = _member.login;
      alasql(insert.member,[
        memberAvatarUrl,
        memberName,
        memberUsername,
        memberWebUrl
      ])
      const member_id = alasql('SELECT id FROM member').pop()['id'];

      alasql(insert.organization_has_member,[
        organization_id,
        member_id
      ])

    });
  })
}

const fillStats = (objUser) => {
  let keys = Object.keys(objUser.calendar).filter((str) => { return str.match(/c[0-9]+/)})
  let days = [];
  let years = {};
  keys.forEach((c) => {
    const year = objUser.calendar[c]
    for (const [w, week] of year.contributionCalendar.weeks.entries()) {
      for (const [d, day] of week.contributionDays.entries()) {
        days.push(day);
      }
    }
  })
  days.forEach((day) => {
    const year = new Date(day.date).getFullYear();
    if(years[year] == undefined){
      years[year] = []
    }
    years[year].push(day);
  })
  Object.keys(years).forEach((y) => {
    const year = years[y];
    const busiestDay = getBusiestDay(year);
    const busiestDayDate = busiestDay.date;
    const busiestDayCount = busiestDay.contributionCount;

    alasql(insert.busiestDay,[
      busiestDayDate,
      busiestDayCount
    ])
    const yearNum = new Date(busiestDayDate).getFullYear();
    const busiestDayId = alasql('SELECT id FROM busiestDay').pop()['id'];
    const platformId = alasql('SELECT id FROM platform').pop()['id'];
    alasql(insert.statistic,[
      yearNum,
      busiestDayId,
      platformId
    ])
    year.forEach((day) => {
      const dayTotal = day.contributionCount;
      const dayDate = day.date;

      if (dayTotal !== 0) {
        if(!streak){
          streak = true;
          streakStart = dayDate;
          streakTotal = dayTotal;
        }
        else {
          streakTotal += dayTotal;
        }
      } 
      else if(streakTotal != 0) {
        const statisticId = alasql('SELECT id FROM statistic').pop()['id'];
        alasql(insert.streak,[
          streakStart,
          new Date(new Date(dayDate).getTime() - (24*60*60*1000)).toISOString().substr(0,10),
          streakTotal,
          statisticId
        ])
        streak = false;
        streakStart = "";
        streakTotal = 0;
      }
    })
  })
}
