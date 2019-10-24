'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
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
            msg: 'Messages greater than 30000 characters are not allowed',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  },
};
