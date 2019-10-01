'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SubscriptionProcesses', [{
        id: 1,
        pid: 0,
        status: "new",
        current: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_subscriptionId: 1
    }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SubscriptionProcesses', null, {});
  }
};