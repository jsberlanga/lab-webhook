const {
  handleClosedWithFeedbackLabel,
  handleLabeledReviewWanted,
} = require("./utils");
const { LABEL_REVIEW_WANTED } = require("./constants");

exports.handler = async (event) => {
  switch (event.action) {
    case "closed":
      if (event.issue.labels.find(({ name }) => name === LABEL_REVIEW_WANTED)) {
        handleClosedWithFeedbackLabel(event);
      }
    case "labeled":
      if (event.label.name === LABEL_REVIEW_WANTED) {
        return handleLabeledReviewWanted(event);
      }
    default:
      return;
  }
};
