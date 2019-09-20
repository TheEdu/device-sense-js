'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subscriptions', [{
      uuid: '9999',
      name: 'test Subscriptions',
      description: 'test Subscriptions',
      collectionRate: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
      fk_dataStoreId: 1,
      fk_deviceId: 1,
      fk_userId: 1,
      fk_collectionType: 1,
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subscriptions', null, {});
  }
};