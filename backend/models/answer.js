'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      content: DataTypes.JSONB,
    },
    {}
  );
  Answer.associate = function(models) {
    Answer.belongsTo(models.Poll);
  };
  return Answer;
};
