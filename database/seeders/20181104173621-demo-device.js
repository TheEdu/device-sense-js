'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Devices', [{
        name: 'Device 1',
        uuid: '0001',
        description: 'Testing Device 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2,
        endpointUrl: 'opc.tcp://DEVICE1:48020',
        rootNode: 'RootFolder'
      }, {
        name: 'Device 2',
        uuid: '0002',
        description: 'Testing Device 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 3,
        endpointUrl: 'opc.tcp://DEVICE2:48020',
        rootNode: 'RootFolder'
      }, {
        name: 'Device 3',
        uuid: '0003',
        description: 'Testing Device 3',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 4,
        endpointUrl: 'opc.tcp://DEVICE3:48020',
        rootNode: 'RootFolder'
      }, {
        name: 'Device 4',
        uuid: '0004',
        description: 'Testing Device 4',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2,
        endpointUrl: 'opc.tcp://DEVICE4:48020',
        rootNode: 'RootFolder'
      }, {
        name: 'Device 5',
        uuid: '0005',
        description: 'Testing Device 5',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2,
        endpointUrl: 'opc.tcp://DEVICE5:48020',
        rootNode: 'RootFolder'
      }, {
        name: 'Device 6',
        uuid: '0006',
        description: 'Testing Device 6',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 3,
        endpointUrl: 'opc.tcp://DEVICE6:48020',
        rootNode: 'RootFolder'
      }, {
        name: 'Device 7',
        uuid: '0007',
        description: 'Testing Device 7',
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_userId: 2,
        endpointUrl: 'opc.tcp://DEVICE7:48020',
        rootNode: 'RootFolder'
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Devices', null, {});
  }
};
