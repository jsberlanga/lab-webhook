# rr-labels webhoook

This lambda function takes care of acting upong the Github webhook that listen to changes on issues

Use cases:

- Sends a message to #rnd-rr-krk when an issue has been labeled with the `Feedback: Review wanted` label
- Removes the `Feedback: Review wanted` label, when a task is closed and contains it.
