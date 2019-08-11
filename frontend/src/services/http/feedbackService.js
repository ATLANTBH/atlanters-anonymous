import { get, post } from "./base";

export function submitFeedback(data) {
  return post("/api/feedback", data).then(res => {
    return res;
  });
}

export function submitMessage(feedbackId, userId, data) {
  return post(
    `/api/feedback/${feedbackId}/user/${userId ? userId : ""}/messages`,
    data
  ).then(res => {
    return res;
  });
}

export function getFeedback(feedbackId) {
  return get(`/api/feedback/${feedbackId}`).then(res => {
    return res;
  });
}

export function getFeedbackMessages(feedbackId) {
  return get(`/api/feedback/${feedbackId}/messages`).then(res => {
    return res;
  });
}
