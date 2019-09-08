'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Feedbacks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      isClosed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Unexpected that isOpen field is empty',
          },
          notNull: {
            msg: 'Field isOpen must be set',
          },
        },
      },
      anonymLastSeenAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Field anonymSeenAt must be set',
          },
        },
      },
      userLastSeenAt: {
        type: Sequelize.DATE,
        defaultValue: null,
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
    return queryInterface.dropTable('Feedbacks');
  },
};
