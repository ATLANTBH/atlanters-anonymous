import dateformat from 'dateformat';
import quickEncrypt from 'quick-encrypt';
import {
  CHARACTER_SPLIT_NUMBER,
  ENCRYPTION_DELIMITER,
} from '../constants/string';

export const QUESTION_TYPES = {
  radio: 'radio',
  checkbox: 'checkbox',
  shortAnswer: 'shortAnswer',
  paragraph: 'paragraph',
  linearScale: 'linearScale',
};

export const FORMAT_DATE = (date) => {
  return dateformat(date, 'dd/mm/yyyy HH:MM');
};

export const GET_FEEDBACK_URL = (req, feedbackId) => {
  return (
    req.protocol + '://' + req.get('host') + '/feedback-ticket/' + feedbackId
  );
};

export const GET_DETAILED_MESSAGE_HTML = (feedback, feedbackUrl, { text }) => {
  const ticketId = `Ticket id: <a href="${feedbackUrl}"><b>${feedback.id}</b></a><br>`;
  const ticketCreatedAt = `Ticket created at: <b>${FORMAT_DATE(
    feedback.createdAt
  )}</b><br>`;
  const messageSentAt = `Message sent at: <b>${FORMAT_DATE(
    new Date()
  )}</b><br><hr>`;
  const details = ticketId + ticketCreatedAt + messageSentAt;
  return { text: details + text };
};

const SEPERATE_AND_ENCRYPT = (text) => {
  let temp = '';
  let encryptedArray = [];
  for (let i = 0; i < text.length; i++) {
    temp += text[i];
    if ((i + 1) % CHARACTER_SPLIT_NUMBER == 0 || i + 1 == text.length) {
      encryptedArray.push(quickEncrypt.encrypt(temp, process.env.PUBLIC_KEY));
      temp = '';
    }
  }
  return encryptedArray;
};

const APPEND_DELIMITER = (encryptedArray) => {
  let finalEncrypted = '';
  for (let i = 0; i < encryptedArray.length; i++) {
    finalEncrypted += encryptedArray[i] + ENCRYPTION_DELIMITER;
  }
  return finalEncrypted;
};

const MERGE_AND_DECRYPT = (splitArray) => {
  let decoded = '';
  for (let i = 0; i < splitArray.length; i++) {
    if (splitArray[i].length != 0)
      decoded += quickEncrypt.decrypt(splitArray[i], process.env.PRIVATE_KEY);
  }
  return decoded;
};

export const ENCRYPT = (text) => {
  const encryptedArray = SEPERATE_AND_ENCRYPT(text);
  const finalEncrypted = APPEND_DELIMITER(encryptedArray);
  return finalEncrypted;
};

export const DECRYPT = (input) => {
  if (!input.includes(ENCRYPTION_DELIMITER))
    return quickEncrypt.decrypt(input, process.env.PRIVATE_KEY);
  const splitArray = input.split(new RegExp(ENCRYPTION_DELIMITER, 'g'));
  const decoded = MERGE_AND_DECRYPT(splitArray);
  return decoded;
};
