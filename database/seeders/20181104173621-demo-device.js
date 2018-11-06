'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Devices', [{
        name: 'Device 1',
        description: 'Testing Device 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2
      }, {
        name: 'Device 2',
        description: 'Testing Device 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 3
      }, {
        name: 'Device 3',
        description: 'Testing Device 3',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 4
      }, {
        name: 'Device 4',
        description: 'Testing Device 4',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2
      }, {
        name: 'Device 5',
        description: 'Testing Device 5',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2
      }, {
        name: 'Device 6',
        description: 'Testing Device 6',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 3
      }, {
        name: 'Device 7',
        description: 'Testing Device 7',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Devices', null, {});
  }
};
