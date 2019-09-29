'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DataTypes', [{
        name: '1',
        identifier: 1,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '2',
        identifier: 2,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '3',
        identifier: 3,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '4',
        identifier: 4,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '5',
        identifier: 5,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '6',
        identifier: 6,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '7',
        identifier: 7,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '8',
        identifier: 8,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '9',
        identifier: 9,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '10',
        identifier: 10,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '11',
        identifier: 11,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '12',
        identifier: 12,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '13',
        identifier: 13,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '14',
        identifier: 14,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '15',
        identifier: 15,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '16',
        identifier: 16,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '17',
        identifier: 17,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '18',
        identifier: 18,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '19',
        identifier: 19,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '20',
        identifier: 20,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '21',
        identifier: 21,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '22',
        identifier: 22,
        supported: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '23',
        identifier: 23,
        supported: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '24',
        identifier: 24,
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