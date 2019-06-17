import Sequelize from 'sequelize';

class Feedback extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        data: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that data field is empty',
            },
            notNull: {
              msg: 'Feedback data must be provided',
            },
          },
        },
      },
      { sequelize }
    );
  }

  static async findById(id) {
    const user = await Feedback.findOne({
      where: { id: id },
    });
    return user;
  }
}

export default Feedback;
