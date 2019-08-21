import dateformat from 'dateformat';

export const questionTypes = {
  radio: 'radio',
  checkbox: 'checkbox',
  shortAnswer: 'shortAnswer',
  paragraph: 'paragraph',
  linearScale: 'linearScale',
};

export const formatDate = date => {
  return dateformat(date, 'dd/mm/yyyy HH:MM');
};
