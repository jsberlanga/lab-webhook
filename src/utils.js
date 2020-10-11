const axios = require("axios");

const handleLabeledReviewWanted = (event) => {
  const getMessageBlock = ({ html_url, title }) =>
    encodeURI(
      JSON.stringify([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*👋🏻 An issue has been tagged for review.* Please take a look 👉🏻 *<${html_url} | ${
              title.length > 50 ? title.substr(0, 50) + "..." : title
            }>*`,
          },
        },
      ])
    );

  return axios.get(
    `https://slack.com/api/chat.postMessage?token=${
      process.env.SLACK_OAUTH_TOKEN
    }&channel=${process.env.SLACK_CHANNEL}&blocks=${getMessageBlock(
      event.issue
    )}&pretty=1`
  );
};

const handleClosedWithFeedbackLabel = (event) => {
  return axios.delete(
    `https://github.schibsted.io/api/v3/repos/rnd/Production/issues/${event.issue.number}/labels/${LABEL_REVIEW_WANTED}`,
    {
      headers: {
        Authorization: process.env.GITHUB_OAUTH_TOKEN,
      },
    }
  );
};

module.exports = {
  handleClosedWithFeedbackLabel,
  handleLabeledReviewWanted,
};
