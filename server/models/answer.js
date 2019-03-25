module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define('answer', {

			content: {
					type: DataTypes.JSONB,
					allowNull: false
			}

	});

	Answer.associate = models => {
			Answer.belongsTo(models.Poll);
			Answer.belongsTo(models.Question);
			Answer.belongsTo(models.PollAnswer);
	};

	return Answer;
}