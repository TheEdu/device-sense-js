'use strict';
module.exports = (sequelize, DataTypes) => {
  const DataType = sequelize.define('DataType', {
    name: DataTypes.STRING,
    identifier: DataTypes.STRING,
    supported: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  DataType.associate = function(models) {
    DataType.belongsTo(models.Device, {foreignKey: 'fk_deviceId', targetKey: 'id'})
  };

  return DataType;
};