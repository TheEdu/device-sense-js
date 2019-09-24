'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscriptionItem = sequelize.define('SubscriptionItem', {
    nodeId: DataTypes.STRING,
    name: DataTypes.STRING,
    identifier: DataTypes.STRING,
    tags: DataTypes.STRING,
    dataType: DataTypes.STRING,
    deadbandAbsolute: DataTypes.FLOAT, // Absolute max difference for a value not to be collected
    deadbandRelative: DataTypes.FLOAT, // Relative max difference for a value not to be collected
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  SubscriptionItem.associate = function(models) {
    SubscriptionItem.belongsTo(models.Subscription, {foreignKey: 'fk_subscriptionId', targetKey: 'id'});
  };

  return SubscriptionItem;
};