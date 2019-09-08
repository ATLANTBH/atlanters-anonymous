'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    'Feedback',
    {
      id: DataTypes.UUID,
      isClosed: DataTypes.BOOLEAN,
      anonymLastSeenAt: DataTypes.DATE,
      userLastSeenAt: DataTypes.DATE,
    },
    {}
  );
  Feedback.associate = function(models) {
    Feedback.hasMany(models.Message, { onDelete: 'CASCADE' });
  };
  return Feedback;
};
