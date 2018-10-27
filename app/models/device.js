'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {} );

  Device.associate = function(models) {
    Device.belongsTo(models.User, {foreignKey: 'fk_userId', targetKey: 'id'});
  };

  return Device;
};