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

export const GET_DETAILED_MESSAGE = (feedback, { text }) => {
  const ticketId = `Ticket id: ${feedback.id}\n`;
  const ticketCreatedAt = `Ticket created at: ${FORMAT_DATE(
    feedback.createdAt
  )}\n`;
  const messageSentAt = `Message sent at: ${FORMAT_DATE(new Date())}\n\n`;
  const details = ticketId + ticketCreatedAt + messageSentAt;
  return { text: details + text };
};
