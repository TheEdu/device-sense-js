'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DataStores', [{
      uuid: '9999',
      name: 'influxdb_test',
      description: 'Test InfluxDB seed',
      type: 'influxdb',
      host: '192.168.56.202',
      port: 8086,
      protocol: 'http',
      username: '',
      password: '',
      database: 'test',
      failoverTimeout: 10000,
      bufferMaxSize: 64,
      writeInterval: 3000,
      writeMaxPoints: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
      fk_userId: 2
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DataStores', null, {});
  }
};