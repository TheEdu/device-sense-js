'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endpointUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      rootNode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeOut: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10000
      },
      fk_userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Devices');
  }
};