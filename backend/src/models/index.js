import Sequelize from 'sequelize';
import AnswerModel from './answer';
import PollModel from './poll';
import PollTemplateModel from './poll-template';
import UserModel from './user';
import FeedbackModel from './feedback';

function initModels(sequelize) {
  const models = {
    User: UserModel.init(sequelize, Sequelize),
    PollTemplate: PollTemplateModel.init(sequelize, Sequelize),
    Answer: AnswerModel.init(sequelize, Sequelize),
    Poll: PollModel.init(sequelize, Sequelize),
    Feedback: FeedbackModel.init(sequelize, Sequelize),
  };

  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  return models;
}

export default initModels;
