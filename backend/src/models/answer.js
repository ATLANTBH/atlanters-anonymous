import Sequelize from 'sequelize';
import validateAnswer from '../routes/validation/answer.post.validate';

class Answer extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        content: {
          type: DataTypes.JSONB,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that content field is empty',
            },
            notNull: {
              msg: 'Answers must be provided',
            },
          },
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    Answer.belongsTo(models.Poll);
  }

  static async validCreate(questions, answers) {
    await validateAnswer(questions, answers);
    return await Answer.create({ content: answers });
  }

  static async findAllWithAssoc(associations = []) {
    return await Answer.findAll({
      include: associations,
    });
  }

  static async findByPollId(pollId) {
    return await Answer.findAll({
      where: {
        PollId: pollId,
      },
    });
  }

  static async findById(id) {
    const answer = await Answer.findOne({
      where: { id: id },
    });
    return answer;
  }

}

export default Answer;
