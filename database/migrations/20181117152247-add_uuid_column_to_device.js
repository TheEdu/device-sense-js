'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Devices',
      'uuid',{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Devices',
      'uuid'
    );
  }
};
