import _ from 'lodash';
import { QUESTION_TYPES } from '../utils';

const checkBoxValuesMatch = (answer, options) => {
  if (answer.length > options.length) return false;
  else if (_.difference(answer, options).length > 0) return false;
  return true;
};

const validateRadio = (answer, baseError, required) => {
  if (!(typeof answer === 'string'))
    throw new Error(baseError + `must be a string type`);
  else if (answer === '' && required)
    throw new Error(baseError + `is not provided, but required`);
};

const validateCheckbox = (answer, baseError, options, required) => {
  if (!(answer instanceof Array))
    throw new Error(baseError + `must be an array type`);
  else if (answer.length == 0 && required)
    throw new Error(baseError + `is not provided, but required`);
  else if (!checkBoxValuesMatch(answer, options))
    throw new Error(baseError + `has invalid arguments`);
};

const validateText = (answer, baseError, required) => {
  if (!(typeof answer === 'string'))
    throw new Error(baseError + `must be a string type`);
  else if (answer === '' && required)
    throw new Error(baseError + `is not provided, but required`);
};

const validateLinearScale = (answer, questionObj, baseError, required) => {
  if (!(typeof answer === 'number'))
    throw new Error(baseError + `must be a number`);
  else if (answer < questionObj.minIndex || answer > questionObj.maxIndex)
    throw new Error(
      baseError +
        `must be a number between ${questionObj.minIndex} - ${
          questionObj.maxIndex
        }`
    );
  else if (!answer && required)
    throw new Error(baseError + `is not provided, but required`);
};

const validateByType = (questionObj, answer) => {
  const type = questionObj.type;
  const required = questionObj.required;
  const question = questionObj.question;
  const baseError = `Answer for question '${question}' `;
  switch (type) {
    case QUESTION_TYPES.radio:
      validateRadio(answer, baseError, required);
      break;
    case QUESTION_TYPES.checkbox:
      validateCheckbox(answer, baseError, questionObj.options, required);
      break;
    case QUESTION_TYPES.shortAnswer:
    case QUESTION_TYPES.paragraph:
      validateText(answer, baseError, required);
      break;
    case QUESTION_TYPES.linearScale:
      validateLinearScale(answer, questionObj, baseError, required);
      break;
  }
};

const getRelatedAnswer = (questionObj, answers) => {
  for (let i = 0; i < answers.length; i++) {
    const question = questionObj.question;
    if (question === Object.keys(answers[i])[0]) {
      return answers[i][question];
    }
  }
  if (questionObj.required)
    throw new Error(
      `Question '${questionObj.question}' not answered, but required`
    );
};

export default async (questions, answers) => {
  if (!answers instanceof Array)
    throw new Error('Unexpected that answers is not an array');
  else if (questions.length > answers.length)
    throw new Error('Answers to certain questions are missing');
  else if (questions.length < answers.length)
    throw new Error('Answers contain more questions than necessary');
  else {
    for (let i = 0; i < questions.length; i++) {
      const answer = getRelatedAnswer(questions[i], answers);
      validateByType(questions[i], answer);
    }
  }
};
