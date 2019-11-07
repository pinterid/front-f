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
const getCalendarQueryPart = (year,c) => {
  return `
  c${c}: contributionsCollection(to:"${year}"){
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
                  edges{
                    node{
                      committedDate
                    }
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
                  edges{
                    node{
                      committedDate
                    }
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
                  edges{
                    node{
                      committedDate
                    }
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

  const date = new Date();
  var query = "";
  var count = 1;

  while(date.getFullYear() >= createdAtDate.getFullYear()){
      
      query += getCalendarQueryPart(date.toJSON(),count);

      date.setFullYear(date.getFullYear()-1);
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
