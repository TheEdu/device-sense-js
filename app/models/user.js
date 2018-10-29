'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {} )

  User.associate = function(models) {
    User.hasMany(models.Device, {foreignKey: 'fk_userId', sourceKey: 'id'})
  }

  User.prototype.validPassword = function (password) {
    return true
  }

  return User;
}