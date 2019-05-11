import { questionTypes } from './utils';

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

const validateOptions = (type, options, questionTypes, questionString) => {
  if (type === questionTypes.radio || type === questionTypes.checkbox) {
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
  }
};

const validateRequired = (required, questionString) => {
  if (!required) throw new Error(`Unexpected that field 'required' is not set`);
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
  validateOptions(type, options, questionTypes, questionString);

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

export default async (PollTemplate, pollTemplateReq) => {
  const questions = pollTemplateReq.questions;

  if (await PollTemplate.findByTitle(pollTemplateReq.title))
    throw new Error(
      `Poll template with title ${pollTemplateReq.title} already exists`
    );
  else if (!questions) throw new Error('Questions must be provided');
  else if (!questions instanceof Array)
    throw new Error('Must be of type array');
  validateQuestions(questions);
};
