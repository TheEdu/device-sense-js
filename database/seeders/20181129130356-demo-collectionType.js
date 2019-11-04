'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CollectionTypes', [{
        id: 1,
        description: 'monitored',
        alias: 'Monitoreado',
        hint: ' (milisegundos)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: 'polled',
        alias: 'Consultado',
        hint: ' (muestras / minuto)',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CollectionTypes', null, {});
  }
};