'use strict';
const { CUSTOMERS_TABLET, CustomerSchemas } = require('../models/costumers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMERS_TABLET, CustomerSchemas);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMERS_TABLET);
  },
};
