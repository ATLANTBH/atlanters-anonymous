'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Messages', 'text', {
      type: Sequelize.STRING(30000),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Unexpected that text field is empty',
        },
        notNull: {
          msg: 'Message text must be provided',
        },
        len: {
          args: [1, 30000],
          msg: `Messages greater than ${30000} characters are not allowed`,
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Messages', 'text', {
      type: Sequelize.STRING(1000),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Unexpected that text field is empty',
        },
        notNull: {
          msg: 'Message text must be provided',
        },
        len: {
          args: [1, 1000],
          msg: `Messages greater than ${1000} characters are not allowed`,
        },
      },
    });
  },
};
