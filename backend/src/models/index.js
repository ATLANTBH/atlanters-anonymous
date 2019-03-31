import Sequelize from 'sequelize';
import AnswerModel from './answer';
import PollAnswerModel from './poll_answer';
import PollModel from './poll';
import PollTemplateModel from './poll_template';
import QuestionModel from './question';
import UserModel from './user';

function initModels(sequelize) {
  const models = {
    User: UserModel.init(sequelize, Sequelize),
    Question: QuestionModel.init(sequelize, Sequelize),
    PollTemplate: PollTemplateModel.init(sequelize, Sequelize),
    Answer: AnswerModel.init(sequelize, Sequelize),
    Poll: PollModel.init(sequelize, Sequelize),
    PollAnswer: PollAnswerModel.init(sequelize, Sequelize)
  };

  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  })
  
  return models;
}

export default initModels;