'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PollTemplates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Unexpected that title is empty',
          },
          notNull: {
            msg: 'Title must be provided',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Unexpected that description is empty',
          },
          notNull: {
            msg: 'Description must be provided',
          },
        },
      },
      questions: {
        type: Sequelize.JSONB,
        allowNull: false,
        notEmpty: true,
        validate: {
          notEmpty: {
            msg: 'Unexpected that questions field is empty',
          },
          notNull: {
            msg: 'Questions must be provided for poll template',
          },
        },
      },
      isDraft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        notEmpty: true,
        defaultValue: false,
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
    return queryInterface.dropTable('PollTemplates');
  },
};
