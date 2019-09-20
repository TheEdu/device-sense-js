'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      collectionRate: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fk_collectionType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CollectionTypes',
          key: 'id'
        }
      },
      fk_userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      fk_deviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Devices',
          key: 'id'
        }
      },
      fk_dataStoreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DataStores',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Subscriptions');
  }
};