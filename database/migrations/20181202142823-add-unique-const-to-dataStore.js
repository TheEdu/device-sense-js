'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('DataStores', ['host', 'port', 'database'], {
      type: 'unique',
      name: 'unique_constraint_DataStores'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('DataStores', 'unique_constraint_DataStores');
  }
};
