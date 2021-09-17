require("dotenv").config();
const { GITHUB_TOKEN } = process.env;
const axios = require("axios");

function gitApiRequest(data, headers) {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    data,
    headers,
  });
}

const topLanguagesQuery = (variables) => {
  return gitApiRequest(
    {
      query: `
          query userInfo($login: String!) {
            user(login: $login) {
              # fetch only owner repos & not forks
              repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
                nodes {
                  name
                  languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                      size
                      node {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
          `,
      variables,
    },
    {
      Authorization: `Bearer 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`,
    }
  );
};

const userStats = (variables) => {
  return gitApiRequest(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          name
          login
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
          repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
          pullRequests(first: 1) {
            totalCount
          }
          issues(first: 1) {
            totalCount
          }
          followers {
            totalCount
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    }
  );
};

module.exports = {
  gitApiRequest,
  userStats,
  topLanguagesQuery,
};
