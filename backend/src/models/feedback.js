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

  static async sendMail({ createdAt, data }) {
    console.log(createdAt);
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
      subject: `Feedback: ${createdAt.toString()}`,
      text: data,
    });
  }
}

export default Feedback;
