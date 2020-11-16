'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.removeColumn('products', 'old_price');

  },

  down: async (queryInterface, Sequelize) => {


     await queryInterface.addColumn('products', 'old_price', { type: DataTypes.INTENGER});
  }
};
