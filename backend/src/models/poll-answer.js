import Sequelize from 'sequelize';

class PollAnswer extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({}, { sequelize });
  }

  static associate(models) {
    PollAnswer.hasMany(models.Answer);
    PollAnswer.belongsTo(models.Poll);
  }
}

export default PollAnswer;
