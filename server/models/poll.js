module.exports = (sequelize, DataTypes) => {
	const Poll = sequelize.define('poll', {

			entity: {
					type: DataTypes.STRING,
					allowNull: false
			},
			description: {
					type: DataTypes.TEXT,
					allowNull: false
			},
			locked: {
					type: DataTypes.BOOLEAN,
					allowNull: false
			},
			max_num_answers: {
					type: DataTypes.INTEGER,
					allowNull: false
			}

	});

	Poll.associate = models => {
			Poll.belongsTo(models.PollTemplate);
			Poll.belongsTo(models.User);
			Poll.hasMany(models.Answer, { onDelete: 'CASCADE' } );
			Poll.hasMany(models.PollAnswer, { onDelete: 'CASCADE' } );
	};

	return Poll;
}