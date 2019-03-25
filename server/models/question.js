module.exports = (sequelize, DataTypes) => {
	const Question = sequelize.define('question', {

			content: {
					type: DataTypes.JSONB,
					allowNull: false
			},
			title: {
					type: DataTypes.TEXT,
					allowNull: false
			},
			type: {
					type: DataTypes.STRING,
					allowNull: false
			}

	});

	Question.associate = models => {
			Question.belongsTo(models.PollTemplate);
			Question.hasOne(models.Answer);
	};

	return Question;
}