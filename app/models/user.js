'use strict'
var bCrypt = require('bcrypt-nodejs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {} )

  User.associate = function(models) {
    User.hasMany(models.Device, {foreignKey: 'fk_userId', sourceKey: 'id'})
    User.hasMany(models.DataStore, {foreignKey: 'fk_userId', sourceKey: 'id'})
    User.hasMany(models.Subscription, {foreignKey: 'fk_userId', sourceKey: 'id'})
  }

  User.hook('beforeCreate', (user, options) => {
    user.password = bCrypt.hashSync(user.password, bCrypt.genSaltSync(10))
  });

  return User;
}