import Sequelize from 'sequelize';

class Question extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        content: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        question: {
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
    Question.belongsTo(models.PollTemplate, { onDelete: 'CASCADE' });
    Question.hasOne(models.Answer);
  }

  static async findById(id) {
    const question = await Question.findOne({
      where: { id: id },
    });
    return question;
  }
}

export default Question;
