'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Devices', [{
        name: 'Unified Automation',
        uuid: '0001',
        description: 'Testing Device 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2,
        endpointUrl: 'opc.tcp://opcuaserver.com:48010',
        rootNode: 'RootFolder',
        timeOut: 10000
      }, {
        name: 'Sterfive',
        uuid: '0002',
        description: 'Testing Device 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 3,
        endpointUrl: 'opc.tcp://opcuademo.sterfive.com:26543',
        rootNode: 'RootFolder',
        timeOut: 10000
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Devices', null, {});
  }
};
