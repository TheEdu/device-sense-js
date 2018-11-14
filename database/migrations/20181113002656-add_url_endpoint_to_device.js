'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    queryInterface.addColumn(
      'Devices',
      'endpointUrl',
     Sequelize.STRING
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    queryInterface.removeColumn(
      'Devices',
      'endpointUrl'
    );
  }
}