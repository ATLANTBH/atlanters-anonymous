import { CHAT_EVENT, SEEN_EVENT } from "../../constants/strings";
import { emit, on } from "./base";

/**
 * Called when server emits message
 *
 * @param {String} feedbackId uuid of feedback object
 * @param {Function} callback function handling received message
 */
export const onMessageReceived = (feedbackId, callback) => {
  on(feedbackId, callback);
};

/**
 * Listening to errors
 *
 * @param {Number} userId id of logged in user (-1 if anonymous)
 * @param {Function} callback function handling the error
 */
export const onErrorReceived = (userId, callback) => {
  on(userId, callback);
};

export const onSeen = (feedbackId, callback) => {
  on(SEEN_EVENT + feedbackId, callback);
};

/**
 * Submits message
 *
 * @param {String} text Chat message
 * @param {Number} userId id of user sending the message (null if anonymous)
 * @param {String} feedbackId uuid of feedback object
 */
export const emitMessage = (feedbackId, message) => {
  emit(CHAT_EVENT, { feedbackId, message });
};

export const emitSeen = (user, feedbackId, date) => {
  emit(SEEN_EVENT, { user, feedbackId, date });
};
