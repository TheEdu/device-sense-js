'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DataTypes', [{
        name: 'Boolean',
        identifier: 1,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'SByte',
        identifier: 2,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Byte',
        identifier: 3,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Int16',
        identifier: 4,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'UInt16',
        identifier: 5,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Int32',
        identifier: 6,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'UInt32',
        identifier: 7,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Int64',
        identifier: 8,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'UInt64',
        identifier: 9,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Float',
        identifier: 10,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Double',
        identifier: 11,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'String',
        identifier: 12,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'DateTime',
        identifier: 13,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Guid',
        identifier: 14,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'ByteString',
        identifier: 15,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'XmlElement',
        identifier: 16,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'NodeId',
        identifier: 17,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'ExpandedNodeId',
        identifier: 18,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'StatusCode',
        identifier: 19,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'QualifiedName',
        identifier: 20,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'LocalizedText',
        identifier: 21,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'Structure',
        identifier: 22,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }, {
        name: 'DataValue',
        identifier: 23,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fk_deviceId: 3
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DataTypes', null, {});
  }
};