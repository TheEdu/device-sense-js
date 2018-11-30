'use strict';
module.exports = (sequelize, DataTypes) => {
  const DataStore = sequelize.define('DataStore', {
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    host: DataTypes.STRING,
    port: DataTypes.INTEGER,
    protocol: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    database: DataTypes.STRING,
    failoverTimeout: DataTypes.INTEGER,
    bufferMaxSize: DataTypes.INTEGER,
    writeInterval: DataTypes.INTEGER,
    writeMaxPoints: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  DataStore.associate = function(models) {
    DataStore.belongsTo(models.User, {foreignKey: 'fk_userId', targetKey: 'id'});
    DataStore.hasMany(models.Subscription, {foreignKey: 'fk_dataStoreId', sourceKey: 'id'})
  };

  return DataStore;
};