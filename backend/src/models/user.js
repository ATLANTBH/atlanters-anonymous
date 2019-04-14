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
            notEmpty: {
              msg: 'Unexpected that email is empty',
            },
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
          defaultValue: [],
        },
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

  static async findByAuthenticationToken(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return Promise.reject(e);
    }

    const Op = Sequelize.Op;
    const user = await User.findOne({
      where: {
        tokens: {
          [Op.contains]: [token],
        },
      },
    });
    return user;
  }

  async generateAuthenticationToken() {
    const user = this;
    const token = jwt
      .sign({ id: user.id.toString() }, process.env.JWT_SECRET)
      .toString();
    user.tokens.push(token);
    await user.update({ tokens: user.tokens });
    return token;
  }

  async removeAuthenticationToken(token) {
    const user = this;
    user.tokens = user.tokens.filter((value, index, array) => {
      return value != token;
    });
    await user.update({ tokens: user.tokens });
    return user;
  }
}

export default User;
