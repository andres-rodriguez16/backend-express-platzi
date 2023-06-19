'use strict';

const { PRODUCT_TABLET, ProductsSchemas } = require('../models/productos');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLET, ProductsSchemas);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCT_TABLET);
  },
};
