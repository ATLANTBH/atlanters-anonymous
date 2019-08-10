import Sequelize from 'sequelize';
import nodemailer from 'nodemailer';
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

  static async sendMail({ data }) {
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
      text: data,
    });
  }
}

export default Feedback;
