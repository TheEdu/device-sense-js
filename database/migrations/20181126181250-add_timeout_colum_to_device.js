'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Devices',
      'timeOut',{
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Devices',
      'timeOut'
    );
  }
};
