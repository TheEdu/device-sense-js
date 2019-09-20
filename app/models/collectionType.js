'use strict';
module.exports = (sequelize, DataTypes) => {
  const CollectionType = sequelize.define('CollectionType', {
    description: DataTypes.STRING,
    hint: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  CollectionType.associate = function(models) {
    CollectionType.hasMany(models.Subscription, {foreignKey: 'fk_collectionType', sourceKey: 'id'});
  };

  return CollectionType;
};