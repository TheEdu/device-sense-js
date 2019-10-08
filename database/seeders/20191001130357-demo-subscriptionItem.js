'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SubscriptionItems', [{
        id: 34,
        nodeId: 'ns=4;i=21999',
        name: 'Variable999',
        identifier: '21999',
        tags: "{ \"suscripcion\": \"" + "test_1_item" + "\"}",
        dataType: 'GENERIC',
        deadbandAbsolute: 0,
        deadbandRelative: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_subscriptionId: 1
    }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SubscriptionItems', null, {});
  }
};