'use strict';
const { COSTUMERS_TABLET, CostumersSchemas } = require('../models/costumers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(COSTUMERS_TABLET, CostumersSchemas);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(COSTUMERS_TABLET);
  },
};
