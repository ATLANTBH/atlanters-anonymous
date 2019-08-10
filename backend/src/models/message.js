import Sequelize from 'sequelize';

class Message extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        text: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that text field is empty',
            },
            notNull: {
              msg: 'Message text must be provided',
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

  static async findByFeedbackId(feedbackId) {
    const messages = await Message.findAll({
      where: { FeedbackId: feedbackId },
    });
    return messages;
  }

  static async findById(id) {
    const user = await Feedback.findOne({
      where: { id: id },
    });
    return user;
  }
}

export default Message;
