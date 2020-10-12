const axios = require("axios");
const { LABEL_REVIEW_WANTED } = require("./constants");

const handleLabeledReviewWanted = async (event) => {
  const getMessageBlock = ({ html_url, title }) =>
    encodeURI(
      JSON.stringify([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*👋🏻 An issue has been tagged for review.*\n _Please take a look 👉🏻 *<${html_url} | ${
              title.length > 50 ? title.substr(0, 50) + "..." : title
            }>_*`,
          },
        },
      ])
    );

  const { data } = await axios.get(
    `https://slack.com/api/chat.postMessage?token=${
      process.env.SLACK_OAUTH_TOKEN
    }&channel=${process.env.SLACK_CHANNEL}&blocks=${getMessageBlock(
      event.issue
    )}&pretty=1`
  );

  return data;
};

const handleClosedWithFeedbackLabel = async (event) => {
  const { data } = await axios.delete(
    `https://github.schibsted.io/api/v3/repos/rnd/Production/issues/${event.issue.number}/labels/${LABEL_REVIEW_WANTED}`,
    {
      headers: {
        Authorization: process.env.GITHUB_OAUTH_TOKEN,
      },
    }
  );

  return data;
};

module.exports = {
  handleClosedWithFeedbackLabel,
  handleLabeledReviewWanted,
};
