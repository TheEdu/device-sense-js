'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subscriptions', [{
        uuid: '1',
        name: 'test_1_item',
        description: 'test Subscriptions',
        collectionRate: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_dataStoreId: 1,
        fk_deviceId: 3,
        fk_userId: 1,
        fk_collectionType: 1,
      }, 
      // {
      //   uuid: '10',
      //   name: 'test_10_item',
      //   description: 'test Subscriptions',
      //   collectionRate: 1000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   fk_dataStoreId: 1,
      //   fk_deviceId: 3,
      //   fk_userId: 1,
      //   fk_collectionType: 1,
      // }, {
      //   uuid: '50',
      //   name: 'test_50_item',
      //   description: 'test Subscriptions',
      //   collectionRate: 1000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   fk_dataStoreId: 1,
      //   fk_deviceId: 3,
      //   fk_userId: 1,
      //   fk_collectionType: 1,
      // }, {
      //   uuid: '100',
      //   name: 'test_100_item',
      //   description: 'test Subscriptions',
      //   collectionRate: 1000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   fk_dataStoreId: 1,
      //   fk_deviceId: 3,
      //   fk_userId: 1,
      //   fk_collectionType: 1,
      // }, {
      //   uuid: '200',
      //   name: 'test_200_item',
      //   description: 'test Subscriptions',
      //   collectionRate: 1000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   fk_dataStoreId: 1,
      //   fk_deviceId: 3,
      //   fk_userId: 1,
      //   fk_collectionType: 1,
      // }, {
      //   uuid: '300',
      //   name: 'test_300_item',
      //   description: 'test Subscriptions',
      //   collectionRate: 1000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   fk_dataStoreId: 1,
      //   fk_deviceId: 3,
      //   fk_userId: 1,
      //   fk_collectionType: 1,
      // }, {
      //   uuid: '500',
      //   name: 'test_500_item',
      //   description: 'test Subscriptions',
      //   collectionRate: 1000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   fk_dataStoreId: 1,
      //   fk_deviceId: 3,
      //   fk_userId: 1,
      //   fk_collectionType: 1,
      // }, {
      //   uuid: '999',
      //   name: 'test_999_item',
      //   description: 'test Subscriptions',
      //   collectionRate: 1000,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   fk_dataStoreId: 1,
      //   fk_deviceId: 3,
      //   fk_userId: 1,
      //   fk_collectionType: 1,
      // }
      ], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subscriptions', null, {});
  }
};