'use strict';
module.exports = (sequelize, DataTypes) => {
  const PollTemplate = sequelize.define(
    'PollTemplate',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      questions: DataTypes.JSONB,
      isDraft: DataTypes.BOOLEAN,
    },
    {}
  );
  PollTemplate.associate = function(models) {
    PollTemplate.hasMany(models.Poll, { onDelete: 'CASCADE' });
    PollTemplate.belongsTo(models.User);
  };
  return PollTemplate;
};
