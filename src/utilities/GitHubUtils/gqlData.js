// A tool to save a graphql query into a variable
import { gql } from "apollo-boost";

// Structure GQL profile code
export const GET_PROFILE = gql`
  query getData($username: String!) {
    user(login: $username) {
      avatarUrl
      company
      createdAt
      name
      login
      email
      websiteUrl
      hovercard {
        contexts {
          message
          octicon
        }
      }
      isEmployee
      isHireable
      location
      status {
        emojiHTML
        expiresAt
        message
        updatedAt
      }
      organizations(first: 100) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            name
            url
            avatarUrl
            name
            membersWithRole(first: 100) {
              totalCount
              nodes {
                name
                login
                avatarUrl
                url
                projectsUrl
              }
            }
          }
        }
      }
    }
  }
`;

// Structure GQL calendar code
const getCalendarQueryPart = (fromYear, toYear, c) => {
  return `
  c${c}: contributionsCollection(from:"${fromYear}", to:"${toYear}" ){
     contributionYears
     contributionCalendar{
        totalContributions
        weeks{
          contributionDays{
            contributionCount
            date
            color
          }
        }
      }
      commitContributionsByRepository {
        contributions{
          totalCount
          
        }
        url
        repository {
          defaultBranchRef{
            target{
              ... on Commit{
                changedFiles
                additions
                deletions
                committedDate
                history{
                  nodes{
                    committer{
                      user{
                        login
                      }
                    }
                    committedDate
                  }
                }
              }
            }
          }
          name
          nameWithOwner
          url
          owner{
            avatarUrl
            login
            url
          }
          languages(first: 50, orderBy: {field: SIZE, direction: DESC}) {
            totalCount
            totalSize
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
      issueContributionsByRepository {
        contributions{
          totalCount
        }
        repository {
          defaultBranchRef{
            target{
              ... on Commit{
                changedFiles
                additions
                deletions
                committedDate
                history{
                  nodes{
                    committer{
                      user{
                        login
                      }
                    }
                    committedDate
                  }
                }
              }
            }
          }
          name
          nameWithOwner
          url
          owner{
            avatarUrl
            login
            url
          }
          languages(first: 50, orderBy: {field: SIZE, direction: DESC}){
            totalCount
            totalSize
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
      pullRequestContributionsByRepository {
        contributions{
          totalCount
        }
        repository {
          defaultBranchRef{
            target{
              ... on Commit{
                changedFiles
                additions
                deletions
                committedDate
                history{
                  nodes{
                    committer{
                      user{
                        login
                      }
                    }
                    committedDate
                  }
                }
              }
            }
          }
          name
          nameWithOwner
          url
          owner{
            avatarUrl
            login
            url
          }
          languages(first: 50, orderBy: {field: SIZE, direction: DESC}){
            totalCount
            totalSize
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  `;
};

// Generates a dynamic query structure
const generateCalendarsQuery = (username, createdAtDate) => {
  var currentYear = new Date().getFullYear();

  var fromDate = new Date(currentYear, 0, 2);
  var toDate = new Date(currentYear + 1, 0, 1);

  var query = "";
  var count = 1;

  while (fromDate.getFullYear() >= createdAtDate.getFullYear()) {
    query += getCalendarQueryPart(fromDate.toJSON(), toDate.toJSON(), count);
    console.log(fromDate.toJSON());
    //console.log(date.setDate(date.getDate()-1))

    fromDate.setFullYear(fromDate.getFullYear() - 1);
    toDate.setFullYear(toDate.getFullYear() - 1);
    count++;
  }
  return query;
};

// Get calendar basic structure
export const getCalendar = (username, createdAt) => {
  const query = gql`
                  query
                  {
                      user(login: "${username}") {
                          ${generateCalendarsQuery(username, createdAt)}
                      }
                    }
  `;
  return query;
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
