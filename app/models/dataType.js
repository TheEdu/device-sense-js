'use strict';
module.exports = (sequelize, DataTypes) => {
  const DataType = sequelize.define('DataType', {
    name: DataTypes.STRING,
    identifier: DataTypes.STRING,
    supported: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  return DataType;
};