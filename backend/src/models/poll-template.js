import Sequelize from 'sequelize';

class PollTemplate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    PollTemplate.hasMany(models.Question, { onDelete: 'CASCADE' });
    PollTemplate.hasMany(models.Poll, { onDelete: 'CASCADE' });
    PollTemplate.belongsTo(models.User);
  }
}

export default PollTemplate;
