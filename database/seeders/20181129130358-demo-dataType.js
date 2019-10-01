'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DataTypes', [{
        name: 'Boolean',
        identifier: 1,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'SByte',
        identifier: 2,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Byte',
        identifier: 3,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Int16',
        identifier: 4,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'UInt16',
        identifier: 5,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Int32',
        identifier: 6,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'UInt32',
        identifier: 7,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Int64',
        identifier: 8,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'UInt64',
        identifier: 9,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Float',
        identifier: 10,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Double',
        identifier: 11,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'String',
        identifier: 12,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'DateTime',
        identifier: 13,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Guid',
        identifier: 14,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'ByteString',
        identifier: 15,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'XmlElement',
        identifier: 16,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'NodeId',
        identifier: 17,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'ExpandedNodeId',
        identifier: 18,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'StatusCode',
        identifier: 19,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'QualifiedName',
        identifier: 20,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'LocalizedText',
        identifier: 21,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Structure',
        identifier: 22,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'DataValue',
        identifier: 23,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DataTypes', null, {});
  }
};