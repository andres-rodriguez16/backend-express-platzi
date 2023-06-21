'use strict';
const {
  ORDER_PRODUCT,
  OrderProductSchema,
} = require('../models/order-product');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT, OrderProductSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT);
  },
};
