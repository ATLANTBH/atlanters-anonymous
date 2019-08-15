import Sequelize from 'sequelize';

class Message extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        text: {
          type: DataTypes.STRING(1000),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that text field is empty',
            },
            notNull: {
              msg: 'Message text must be provided',
            },
            len: {
              args: [1, 1000],
              msg: 'Messages greater than 1000 characters are not allowed',
            },
          },
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    Message.belongsTo(models.User);
  }

  static async findByFeedbackId(feedbackId, User) {
    const messages = await Message.findAll({
      where: { FeedbackId: feedbackId },
      include: [
        {
          model: User,
          attributes: ['name', 'surname'],
        },
      ],
    });
    return messages;
  }

  static async findById(id, User) {
    const user = await Message.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ['name', 'surname'],
        },
      ],
    });
    return user;
  }
}

export default Message;
