import dateformat from 'dateformat';
import quickEncrypt from 'quick-encrypt';

export const QUESTION_TYPES = {
  radio: 'radio',
  checkbox: 'checkbox',
  shortAnswer: 'shortAnswer',
  paragraph: 'paragraph',
  linearScale: 'linearScale',
};

export const FORMAT_DATE = date => {
  return dateformat(date, 'dd/mm/yyyy HH:MM');
};

export const GET_FEEDBACK_URL = (req, feedbackId) => {
  return req.protocol + '://' + req.get('host') + '/feedback/' + feedbackId;
};

export const GET_DETAILED_MESSAGE_HTML = (feedback, feedbackUrl, { text }) => {
  const ticketId = `Ticket id: <a href="${feedbackUrl}"><b>${
    feedback.id
  }</b></a><br>`;
  const ticketCreatedAt = `Ticket created at: <b>${FORMAT_DATE(
    feedback.createdAt
  )}</b><br>`;
  const messageSentAt = `Message sent at: <b>${FORMAT_DATE(
    new Date()
  )}</b><br><hr>`;
  const details = ticketId + ticketCreatedAt + messageSentAt;
  return { text: details + text };
};

export const ENCRYPT = text => {
  return quickEncrypt.encrypt(text, process.env.PUBLIC_KEY);
};

export const DECRYPT = input => {
  return quickEncrypt.decrypt(input, process.env.PRIVATE_KEY);
};
