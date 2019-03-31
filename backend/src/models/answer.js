import Sequelize from 'sequelize';

class Answer extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        content: {
          type: DataTypes.JSONB,
          allowNull: false
        }
      },
      { sequelize }
    );
  }

  static associate(models) {
    Answer.belongsTo(models.Poll);
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.PollAnswer);
  }

}

export default Answer;