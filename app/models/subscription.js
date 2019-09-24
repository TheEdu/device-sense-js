'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    collectionRate: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User, {foreignKey: 'fk_userId', targetKey: 'id'});
    Subscription.belongsTo(models.Device, {foreignKey: 'fk_deviceId', targetKey: 'id'});
    Subscription.belongsTo(models.DataStore, {foreignKey: 'fk_dataStoreId', targetKey: 'id'});
    Subscription.belongsTo(models.CollectionType, {foreignKey: 'fk_collectionType', targetKey: 'id'});
    Subscription.hasMany(models.SubscriptionItem, {foreignKey: 'fk_subscriptionId', sourceKey: 'id'});
  };

  return Subscription;
};