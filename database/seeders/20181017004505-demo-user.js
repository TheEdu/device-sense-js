'use strict'
var bCrypt = require('bcrypt-nodejs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        id: 1,
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin',
        password:  bCrypt.hashSync('admin', bCrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        firstName: 'Eduardo',
        lastName: 'Denis',
        email: 'edenis@device',
        password:  bCrypt.hashSync('1', bCrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        firstName: 'Juan',
        lastName: 'Gallardo',
        email: 'jgallardo@device',
        password:  bCrypt.hashSync('1', bCrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        firstName: 'Pablo',
        lastName: 'Amigo',
        email: 'pamigo@device',
        password:  bCrypt.hashSync('1', bCrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        firstName: 'Matias',
        lastName: 'Garcia',
        email: 'mgarcia@device',
        password:  bCrypt.hashSync('1', bCrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}