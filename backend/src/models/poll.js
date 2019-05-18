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
        numAnswers: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }

  async isMaxNumAnswersReached() {
    if (this.maxNumAnswers == this.numAnswers) return true;
    return false;
  }

  async incrementNumAnswers() {
    await this.update({ numAnswers: ++this.numAnswers });
  }

  static associate(models) {
    Poll.hasMany(models.Answer, { onDelete: 'CASCADE' });
    Poll.belongsTo(models.PollTemplate);
    Poll.belongsTo(models.User);
  }

  static async findAllWithAssoc(associations = []) {
    return await Poll.findAll({
      include: associations,
    });
  }

  static async findById(id) {
    const poll = await Poll.findOne({
      where: { id: id },
    });
    return poll;
  }

  static async findByUserId(userId) {
    const polls = await Poll.findAll({
      where: { UserId: userId },
    });
    return polls;
  }

  static async findByPollTemplateId(pollTemplateId) {
    const polls = await Poll.findAll({
      where: { PollTemplateId: pollTemplateId },
    });
    return polls;
  }
}

export default Poll;
