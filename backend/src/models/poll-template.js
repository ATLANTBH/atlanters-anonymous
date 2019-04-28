import Sequelize from 'sequelize';

class PollTemplate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that title is empty',
            },
            notNull: {
              msg: 'Title must be provided',
            },
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
              msg: 'Description must be provided',
            },
          },
        },
        questions: {
          type: DataTypes.JSONB,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that questions field is empty',
            },
            notNull: {
              msg: 'Questions must be provided for poll template',
            },
          },
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    PollTemplate.hasMany(models.Poll, { onDelete: 'CASCADE' });
    PollTemplate.belongsTo(models.User);
  }

  static async findAllWithAssoc(associations = []) {
    return await PollTemplate.findAll({
      include: associations,
    });
  }

  static async findById(id) {
    const pollTemplate = await PollTemplate.findOne({
      where: { id: id },
    });
    return pollTemplate;
  }

  static async findByTitle(title) {
    const pollTemplate = await PollTemplate.findOne({
      where: { title: title },
    });
    return pollTemplate;
  }
}

export default PollTemplate;
