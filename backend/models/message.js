'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      text: DataTypes.STRING,
    },
    {}
  );
  Message.associate = function(models) {
    Message.belongsTo(models.User);
  };
  return Message;
};
