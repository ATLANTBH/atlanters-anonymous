import _ from 'lodash';

const checkBoxValuesMatch = (answer, options) => {
  if (answer.length > options.length) return false;
  else if (_.difference(answer, options).length > 0) return false;
  return true;
};

const validateRadio = (answer, baseError, required) => {
  if (!(typeof answer === 'string'))
    throw new Error(baseError + `should be a string type`);
  else if (answer === '' && required)
    throw new Error(baseError + `is not provided, but required`);
};

const validateCheckbox = (answer, baseError, options, required) => {
  if (!(answer instanceof Array))
    throw new Error(baseError + `should be an array type`);
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

const validateByType = (questionObj, answer) => {
  const type = questionObj.type;
  const required = questionObj.required;
  const question = questionObj.question;
  const baseError = `Answer for question '${question}' `;
  switch (type) {
    case 'radio':
      validateRadio(answer, baseError, required);
      break;
    case 'checkbox':
      validateCheckbox(answer, baseError, questionObj.options, required);
      break;
    case 'text':
      validateText(answer, baseError, required);
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

const isAnswerValid = (questions, answers) => {
  let result = { valid: false, error: '' };
  if (!answers instanceof Array)
    result.error = 'Unexpected that answers is not an array';
  else if (questions.length > answers.length)
    result.error = 'Answers to certain questions are missing';
  else if (questions.length < answers.length)
    result.error = 'Answers contain more questions than necessary';
  else {
    for (let i = 0; i < questions.length; i++) {
      try {
        const answer = getRelatedAnswer(questions[i], answers);
        validateByType(questions[i], answer);
      } catch (error) {
        result.error = error;
        break;
      }
    }
  }
  if (result.error === '') result.valid = true;
  return result;
};

export default ({ models }) => {
  const { Answer, Poll, PollTemplate } = models;
  return async (req, res, next) => {
    const answers = req.body;
    const pollId = req.params.pollId;
    const pollTemplateId = req.params.pollTemplateId;
    try {
      const poll = await Poll.findById(pollId);
      if (await poll.isMaxNumAnswersReached(Answer))
        throw new Error(
          `Maximum number of answers reached (${poll.maxNumAnswers})`
        );
      const pollTemplate = await PollTemplate.findById(pollTemplateId);
      if (poll && pollTemplate) {
        const answersValid = isAnswerValid(pollTemplate.questions, answers);
        if (!answersValid.valid) next(new Error(answersValid.error));
        else {
          req.answers = answers;
          req.poll = poll;
          req.pollTemplate = pollTemplate;
          next();
        }
      } else next(new Error(`Poll with id ${pollId} does not exist`));
    } catch (error) {
      next(new Error(error));
    }
  };
};
