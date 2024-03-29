import { get, post, put } from "./base";

export function getAllFeedback() {
  return get("/api/feedback");
}

export function closeFeedback(feedbackId) {
  return put(`/api/feedback/${feedbackId}/close`);
}

export function updateSeenAt(feedbackId, payload) {
  return put(`/api/feedback/${feedbackId}/seen`, payload);
}

export function submitFeedback(data) {
  return post("/api/feedback", data);
}

export function getFeedback(feedbackId) {
  return get(`/api/feedback/${feedbackId}`);
}

export function getFeedbackMessages(feedbackId) {
  return get(`/api/feedback/${feedbackId}/messages`);
}

export function postFeedbackMessage(feedbackId, userId, data) {
  let userIdPath = "";
  if (userId && userId !== "") userIdPath = `/${userId}`;
  return post(`/api/feedback/${feedbackId}/user${userIdPath}/messages`, data);
}

export function markAllFeedbacksRead() {
  return put(`/api/feedback/mark-all-read`);
}