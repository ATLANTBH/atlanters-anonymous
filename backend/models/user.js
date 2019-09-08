'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      tokens: DataTypes.ARRAY,
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.PollTemplate);
    User.hasMany(models.Poll);
    User.hasMany(models.Message);
  };
  return User;
};
