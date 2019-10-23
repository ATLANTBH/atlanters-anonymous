import Sequelize from 'sequelize';
import { MAXIMUM_ALLOWED_CHARACTERS } from '../constants/string';
import { DECRYPT, ENCRYPT } from '../routes/utils';
class Message extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        text: {
          type: DataTypes.STRING(MAXIMUM_ALLOWED_CHARACTERS),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that text field is empty',
            },
            notNull: {
              msg: 'Message text must be provided',
            },
            len: {
              args: [1, MAXIMUM_ALLOWED_CHARACTERS],
              msg: `Messages greater than ${MAXIMUM_ALLOWED_CHARACTERS} characters are not allowed`,
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
    let messages = await Message.findAll({
      where: { FeedbackId: feedbackId },
      include: [
        {
          model: User,
          attributes: ['name', 'surname'],
        },
      ],
    });
    messages = Message.decryptMessages(messages);
    return messages;
  }

  static decryptMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
      messages[i].dataValues.text = DECRYPT(messages[i].dataValues.text);
    }
    return messages;
  }

  static async findById(id, User) {
    const message = await Message.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'surname'],
        },
      ],
    });
    message.text = DECRYPT(message.text);
    return message;
  }

  static async create(message) {
    const plainMessageText = message.text;
    message.text = ENCRYPT(plainMessageText);
    const buildMessage = await Message.build(message);
    const savedMessage = await buildMessage.save();
    savedMessage.dataValues.text = plainMessageText;
    return savedMessage;
  }
}

export default Message;
