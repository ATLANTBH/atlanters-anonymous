import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: {
              msg: 'Email address must be valid',
            },
            notEmpty: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              msg: 'Password must be at least 8 characters long',
              args: 8,
            },
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that name is empty',
            },
          },
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Unexpected that surname is empty',
            },
          },
        },
        tokens: {
          type: DataTypes.ARRAY(DataTypes.STRING(800)),
          defaultValue: []
        }
      },
      { sequelize }
    );
  }

  static associate(models) {
    User.hasMany(models.PollTemplate);
    User.hasMany(models.Poll);
  }

  static async findByEmail(uEmail) {
    const user = await User.findOne({
      where: { email: uEmail },
    });
    return user;
  }

  static async findByEmailOrCreate(userObject) {
    const resultArray = await User.findOrCreate({
      where: { email: userObject.email },
      defaults: userObject,
    });
    return resultArray;
  }

  async generateAuthenticationToken() {
    const user = this;
    const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_SECRET).toString();
    user.tokens.push(token);
    await user.update({ tokens: user.tokens });
    return token;
  }

}

export default User;
