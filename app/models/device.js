'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    endpointUrl: DataTypes.STRING,
    uuid: DataTypes.STRING,
    rootNode: DataTypes.STRING,
    timeOut: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  Device.associate = function(models) {
    Device.belongsTo(models.User, {foreignKey: 'fk_userId', targetKey: 'id'})
    Device.hasMany(models.Subscription, {foreignKey: 'fk_deviceId', sourceKey: 'id'})
  };

  return Device;
};