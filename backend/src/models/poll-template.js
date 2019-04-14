import Sequelize from 'sequelize';

class PollTemplate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that title is empty',
            },
            notNull: {
              msg: 'Title must be provided'
            }
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that description is empty',
            },
            notNull: {
              msg: 'Description must be provided'
            }
          },
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

  static async findByTitle(title) {
    const pollTemplate = await PollTemplate.findOne({
      where: { title: title }
    });
    return pollTemplate;
  }

}

export default PollTemplate;
