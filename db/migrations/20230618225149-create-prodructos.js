'use strict';

const { PRODUCT_TABLET, ProductsSchemas } = require('../models/productos');
const { CATEGORY_TABLET, CategoriesSchemas } = require('../models/category');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLET, CategoriesSchemas);
    await queryInterface.createTable(PRODUCT_TABLET, ProductsSchemas);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLET);
    await queryInterface.dropTable(PRODUCT_TABLET);
  },
};
