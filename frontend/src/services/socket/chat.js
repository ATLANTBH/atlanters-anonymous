import { on, emit } from "./base";
import { CHAT_EVENT } from "../../constants/strings";

/**
 * Fires when server emits message
 *
 * @param {String} feedbackId uuid of feedback object
 * @param {Function} callback function handling received message
 */
export const onMessageReceived = (feedbackId, callback) => {
  on(feedbackId, callback);
};

/**
 * Submits message
 *
 * @param {String} text Chat message
 * @param {Number} userId id of user sending the message (null if anonymous)
 * @param {String} feedbackId uuid of feedback object
 */
export const emitMessage = (text, userId, feedbackId) => {
  emit(CHAT_EVENT, { text, userId, feedbackId });
};
