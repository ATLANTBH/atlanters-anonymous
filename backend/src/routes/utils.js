import dateformat from 'dateformat';

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

export const GET_DETAILED_MESSAGE_HTML = (feedback, { text }) => {
  const ticketId = `Ticket id: <a href="/feedback/${feedback.id}"><b>${
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
