'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CollectionTypes', [{
        id: 1,
        description: 'monitored',
        hint: '# milliseconds',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: 'polled',
        hint: '# samples / minute.',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CollectionTypes', null, {});
  }
};