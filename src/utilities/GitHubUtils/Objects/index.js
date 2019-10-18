export const structure = {
  platformName: "GitHub",
  platformUrl: "https://github.com",
  avatarUrl: "",
  websiteUrl: "",
  company: "",
  email: "",
  name: "",
  createdAt: "",
  location: "",
  status: {
    message: "",
    emojiHTML: ""
  },
  organizations: [],
  repos: [],
  contributions: {
    years: []
  }
};

export const organizations = {
  avatarUrl: "",
  name: "",
  orgUrl: "",
  members: []
};

export const members = {
  avatarUrl: "",
  name: "",
  username: "",
  url: ""
};

export const repos = {
  avatarUrl: "",
  name: "",
  repoUrl: "",
  owner: {
    avatarUrl: "",
    name: "",
    username: "",
    url: ""
  },
  members: [],
  languagesPie: {
    size: "",
    count: "",
    edges: [],
    slice: {
      size: "",
      count: "",
      edges: []
    }
  }
};

export const edges = {
  name: "",
  size: "",
  color: ""
};

export const yearEntry = {
  stats: {
    commits: {
      total: "",
      reposCount: ""
    },
    issues: {
      total: "",
      reposCount: ""
    },
    pullRequests: {
      total: "",
      reposCount: ""
    },
    codeReviews: {
      total: "",
      reposCount: ""
    },
    busiestDay: {
      date: "",
      count: ""
    },
    average: "",
    streaks: {
      currentStreak: {
        startDate: "",
        endDate: "",
        total: ""
      },
      longestStreak: {
        startDate: "",
        endDate: "",
        total: ""
      },
      history: []
    }
  },
  calendar: {}
};

export const history = {
  startDate: "",
  endDate: "",
  total: ""
};

export const calendarEntry = {
  week: "",
  weekday: "",
  total: "",
  color: "",
  contributions: {
    commits: [],
    codeReviews: [],
    pullRequests: [],
    issues: []
  }
};

export const contribution = {
  datetime: "",
  nameWithOwner: "",
  repoUrl: "",
  additions: "",
  deletions: "",
  changedFiles: "",
  languages: {
    size: "",
    count: "",
    edges: []
  }
};

export const labels = {
  name: "",
  description: "",
  color: ""
};
