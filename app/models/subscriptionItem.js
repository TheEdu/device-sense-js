'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscriptionItem = sequelize.define('SubscriptionItem', {
    nodeId: DataTypes.STRING,
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  SubscriptionItem.associate = function(models) {
    SubscriptionItem.belongsTo(models.Subscription, {foreignKey: 'fk_subscriptionId', targetKey: 'id'});
  };

  return SubscriptionItem;
};