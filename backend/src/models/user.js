import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

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

  static async findAllWithAssoc(associations = []) {
    return await User.findAll({
      include: associations,
    });
  }

  static async findByEmail(uEmail) {
    const user = await User.findOne({
      where: { email: uEmail },
    });
    return user;
  }

  static async findById(id) {
    const user = await User.findOne({
      where: { id: id },
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
    } catch (error) {
      return Promise.reject(error);
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

  static async getPasswordHash(inputPassword) {
    return await hash(inputPassword, parseInt(process.env.SALT_ROUNDS));
  }

  static async getUserObject(reqUser, User) {
    return User.build({
      email: reqUser.email,
      password: await User.getPasswordHash(reqUser.password),
      name: reqUser.name,
      surname: reqUser.surname,
    });
  }

  static async insert(reqUser) {
    await User.checkEmailValid(reqUser.email);
    User.checkPasswordValid(reqUser.password);
    const user = await User.getUserObject(reqUser, User);
    await user.save();
    const token = await user.generateAuthenticationToken();
    return { user, token };
  }

  static isPasswordValid(password) {
    const validPassword =
      typeof password == 'string' &&
      password.trim() != '' &&
      password.trim().length >= 8;
    return validPassword;
  }

  static checkPasswordValid(password) {
    if (!User.isPasswordValid(password))
      throw new Error('Password must be at least 8 characters long');
  }

  static async checkEmailValid(email) {
    if (await User.findByEmail(email))
      throw new Error('User with this email already exists');
  }

  static async getValidUserRequest(userToUpdate, reqUser) {
    let password = reqUser.password;
    const email = reqUser.email;
    if (email) {
      if (email === userToUpdate.email)
        throw new Error(`Email matches the one currently in use`);
      await User.checkEmailValid(reqUser.email);
    }
    if (password) {
      User.checkPasswordValid(reqUser.password);
      if (await compare(password, userToUpdate.password))
        throw new Error(`Password matches the one currently in use`);
      password = await User.getPasswordHash(password);
    }
    return {
      email: email,
      password: password,
      name: reqUser.name,
      surname: reqUser.surname,
    };
  }

  static async authenticate(email, password) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('User with this email does not exist');
    else {
      const isPasswordEqual = await compare(password, user.password);
      if (!isPasswordEqual) throw new Error('Password incorrect');
      return user;
    }
  }

  static async generateAuthenticationToken(user) {
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
