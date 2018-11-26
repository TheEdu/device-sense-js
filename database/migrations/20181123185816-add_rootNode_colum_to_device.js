'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Devices',
      'rootNode',{
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Devices',
      'rootNode'
    );
  }
};
