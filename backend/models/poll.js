'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define(
    'Poll',
    {
      entity: DataTypes.STRING,
      description: DataTypes.TEXT,
      locked: DataTypes.BOOLEAN,
      maxNumAnswers: DataTypes.INTEGER,
      numAnswers: DataTypes.INTEGER,
    },
    {}
  );
  Poll.associate = function(models) {
    Poll.hasMany(models.Answer, { onDelete: 'CASCADE' });
    Poll.belongsTo(models.PollTemplate);
    Poll.belongsTo(models.User);
  };
  return Poll;
};
