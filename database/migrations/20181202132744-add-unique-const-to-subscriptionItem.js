'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('SubscriptionItems', ['nodeId', 'fk_subscriptionId'], {
      type: 'unique',
      name: 'unique_constraint_subscriptionItems'
    });
  },

  down: (queryInterface, Sequelize) => {
  	return queryInterface.removeConstraint('SubscriptionItems', 'unique_constraint_subscriptionItems');
  }
};
