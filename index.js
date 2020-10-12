const {
  handleClosedWithFeedbackLabel,
  handleLabeledReviewWanted,
} = require("./utils");
const { LABEL_REVIEW_WANTED } = require("./constants");

exports.handler = async (event) => {
  switch (event.action) {
    case "closed":
      if (event.issue.labels.find(({ name }) => name === LABEL_REVIEW_WANTED)) {
        const data = await handleClosedWithFeedbackLabel(event);

        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      }
    case "labeled":
      if (event.label.name === LABEL_REVIEW_WANTED) {
        const data = await handleLabeledReviewWanted(event);

        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      }
    default:
      return {
        statusCode: 200,
        body: JSON.stringify("Event action is not supported"),
      };
  }
};
