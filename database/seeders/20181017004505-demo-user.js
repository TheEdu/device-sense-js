'use strict'
var bCrypt = require('bcrypt-nodejs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin',
        password:  bCrypt.hashSync('admin', bCrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
}