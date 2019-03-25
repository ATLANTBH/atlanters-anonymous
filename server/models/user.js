module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {

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

	})

	User.findByEmail = async uEmail => {
			let user = await User.findOne({
					where: { email: uEmail }
			});
			return user;
	}

	User.findByEmailOrCreate = async userObject => {
		let resultArray = await User.findOrCreate({ 
			where: { email: userObject.email },
			defaults: userObject 
		})
		return resultArray;
	}

	User.associate = models => {
			User.hasMany(models.PollTemplate);
			User.hasMany(models.Poll);
	};

	return User;
}