import Sequelize from 'sequelize';

class Question extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        content: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    Question.belongsTo(models.PollTemplate);
    Question.hasOne(models.Answer);
  }
}

export default Question;
