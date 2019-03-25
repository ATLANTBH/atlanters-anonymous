module.exports = (sequelize, DataTypes) => {
	const PollTemplate = sequelize.define('poll_template', {

			title: {
					type: DataTypes.STRING,
					allowNull: false
			},
			description: {
					type: DataTypes.TEXT,
					allowNull: false
			}

	});

	PollTemplate.associate = models => {
			PollTemplate.hasMany(models.Question, { onDelete: 'CASCADE' } );
			PollTemplate.hasMany(models.Poll, { onDelete: 'CASCADE' } );
			PollTemplate.belongsTo(models.User);
	};

	return PollTemplate;
}