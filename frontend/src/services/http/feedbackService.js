import { get, post, put } from "./base";

export function getAllFeedback() {
  return get("/api/feedback").then(res => {
    return res;
  });
}

export function closeFeedback(feedbackId) {
  return put(`/api/feedback/${feedbackId}/close`).then(res => {
    return res;
  });
}

export function updateSeenAt(feedbackId, payload) {
  return put(`/api/feedback/${feedbackId}/seen`, payload).then(res => {
    return res;
  });
}

export function submitFeedback(data) {
  return post("/api/feedback", data).then(res => {
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

export function postFeedbackMessage(feedbackId, userId, data) {
  return post(`/api/feedback/${feedbackId}/user/${userId}/messages`, data).then(
    res => {
      return res;
    }
  );
}
