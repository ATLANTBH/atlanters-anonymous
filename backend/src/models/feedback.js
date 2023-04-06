import nodemailer from 'nodemailer';
import Sequelize from 'sequelize';
class Feedback extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
          validate: {
            notNull: true,
          },
        },
        isClosed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that isOpen field is empty',
            },
            notNull: {
              msg: 'Field isOpen must be set',
            },
          },
        },
        anonymLastSeenAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Field anonymSeenAt must be set',
            },
          },
        },
        userLastSeenAt: {
          type: DataTypes.DATE,
          defaultValue: null,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    Feedback.hasMany(models.Message, { onDelete: 'CASCADE' });
  }

  static async findById(id) {
    const user = await Feedback.findOne({
      where: { id: id },
    });
    return user;
  }

  /**
   * Updates userLastSeenAt of all Feedbacks to the current date
   */
  static async markAllAsRead() {
    const Op = Sequelize.Op;
    return await Feedback.update(
      {
        userLastSeenAt: new Date()
      },
      {
        where: {
          id: {
            [Op.not]: null
          }
        }
      }
    );
  }

  static async getAllFeedbacks(Message) {
    return await Feedback.findAll({
      include: [{ model: Message }],
      order: [[ 'createdAt', 'DESC' ]],
    });
  }

  static async sendMail({ text }) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_FEEDBACK_USER,
        pass: process.env.EMAIL_FEEDBACK_PW,
      },
    });
    return await transporter.sendMail({
      from: process.env.EMAIL_FEEDBACK,
      to: process.env.EMAIL_FEEDBACK,
      subject: 'Feedback Received',
      html: text,
    });
  }

  close() {
    this.isClosed = true;
  }
}

export default Feedback;
