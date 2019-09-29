'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Devices', [{
        name: 'Unified Automation',
        uuid: '9998',
        description: 'Testing Device 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2,
        endpointUrl: 'opc.tcp://opcuaserver.com:48010',
        rootNode: 'RootFolder',
        timeOut: 20000
      }, {
        name: 'Sterfive',
        uuid: '9999',
        description: 'Testing Device 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 3,
        endpointUrl: 'opc.tcp://opcuademo.sterfive.com:26543',
        rootNode: 'RootFolder',
        timeOut: 20000
      }, {
        name: 'LALALA_48',
        uuid: '10001',
        description: 'Demo Server 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 3,
        endpointUrl: 'opc.tcp://PENTIUM-I5:48020',
        rootNode: 'ns=4;s=Demo',
        timeOut: 20000
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Devices', null, {});
  }
};
