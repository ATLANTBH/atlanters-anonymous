import Sequelize from 'sequelize';

class Poll extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        entity: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        locked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        maxNumAnswers: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    Poll.hasMany(models.Answer, { onDelete: 'CASCADE' });
    Poll.hasMany(models.PollAnswer, { onDelete: 'CASCADE' });
    Poll.belongsTo(models.PollTemplate);
    Poll.belongsTo(models.User);
  }

  static async findById(id) {
    const poll = await Poll.findOne({
      where: { id: id },
    });
    return poll;
  }
}

export default Poll;
