import Sequelize from 'sequelize';

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
              msg: "Email address must be valid"
            },
            notEmpty: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              msg: "Password must be at least 8 characters long",
              args: 8
            }
          }
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Unexpected that name is empty"
            }
          }
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Unexpected that surname is empty"
            }
          }
        }
      },
      { sequelize }
    )
  }

  static associate(models) {
    User.hasMany(models.PollTemplate);
    User.hasMany(models.Poll);
  }

  static async findByEmail(uEmail) {
    const user = await User.findOne({
      where: { email: uEmail }
    });
    return user;
  }

  static async findByEmailOrCreate(userObject) {
    const resultArray = await User.findOrCreate({
      where: { email: userObject.email },
      defaults: userObject
    })
    return resultArray;
  }

}

export default User;