module.exports = (sequelize, DataTypes) => {
	const PollAnswer = sequelize.define('poll_answer', {

	});

	PollAnswer.associate = models => {
			PollAnswer.hasMany(models.Answer);
			PollAnswer.belongsTo(models.Poll);
	};

	return PollAnswer;
}