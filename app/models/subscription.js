'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.Device, {foreignKey: 'fk_deviceId', targetKey: 'id'});
    Subscription.belongsTo(models.User, {foreignKey: 'fk_userId', targetKey: 'id'});
  };

  return Subscription;
};