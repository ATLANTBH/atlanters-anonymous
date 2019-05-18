import { questionTypes } from './utils';
import _ from 'lodash';

const validateOptionFields = options => {
  for (let option in options) {
    if (!(typeof option === 'string')) return false;
  }
  return true;
};

const validateType = (type, questionTypes, questionString) => {
  if (!type)
    throw new Error(
      `Unexpected that type is not defined in '${questionString}'`
    );
  else if (!(type in questionTypes)) {
    throw new Error(`Type ${type} is not supported`);
  }
};

const validateOptions = (type, question, questionTypes, questionString) => {
  // short answer and paragraph types do not need special validation
  if (type === questionTypes.radio || type === questionTypes.checkbox) {
    const options = question.options;
    if (!options)
      throw new Error(
        `Options must be provided for the given type '${type}' in '${questionString}'`
      );
    else {
      if (
        !(options instanceof Array) ||
        options.length == 0 ||
        !validateOptionFields(options)
      )
        throw new Error(
          `Options must be an array of strings in '${questionString}'`
        );
    }
  } else if (type === questionTypes.linearScale) {
    const keys = Object.keys(question);
    const linearScaleKeys = ['minIndex', 'maxIndex', 'minChoice', 'maxChoice'];
    if (_.difference(linearScaleKeys, keys) != 0)
      throw new Error(
        `Question must contain the following properties: ${linearScaleKeys} in '${questionString}'`
      );
    else if (question.minIndex >= question.maxIndex)
      throw new Error(
        `Unexpected that ${question.minIndex} is not strictly less than ${
          question.maxIndex
        } in '${questionString}'`
      );
    else if (!(typeof question.minChoice === 'string'))
      throw new Error(`Unexpected that minChoice is not string`);
    else if (!(typeof question.maxChoice === 'string'))
      throw new Error(`Unexpected that maxChoice is not string`);
  }
};

const validateRequired = (required, questionString) => {
  if (required == null)
    throw new Error(
      `Unexpected that field 'required' is not set in '${questionString}'`
    );
  else if (!(typeof required === 'boolean'))
    throw new Error(`Required must be true or false in '${questionString}'`);
};

const validateQuestion = question => {
  const questionString = question.question;
  if (!questionString) throw new Error('Question must be provided');
  if (!(typeof questionString === 'string'))
    throw new Error(`Question must of type string in ${questionString}`);

  const type = question.type;
  validateType(type, questionTypes, questionString);

  const options = question.options;
  validateOptions(type, question, questionTypes, questionString);

  const required = question.required;
  validateRequired(required, questionString);

  return { type, options, questionString, required };
};

const validateQuestions = questions => {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    validateQuestion(question);
  }
};

export default async pollTemplateReq => {
  const questions = pollTemplateReq.questions;
  if (!questions) throw new Error('Questions must be provided');
  else if (!(questions instanceof Array))
    throw new Error('Questions must be of type array');
  else if (questions.length == 0)
    throw new Error('Questions must not be empty');
  validateQuestions(questions);
};
