'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubscriptionProcess = sequelize.define('SubscriptionProcess', {
    pid: DataTypes.STRING,
    status: DataTypes.STRING,
    current: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  SubscriptionProcess.associate = function(models) {
    SubscriptionProcess.belongsTo(models.Subscription, {foreignKey: 'fk_subscriptionId', targetKey: 'id'});
  };

  return SubscriptionProcess;
};