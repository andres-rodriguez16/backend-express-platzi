'use strict';

const {USER_TABLET, UsersSchemas} = require('../models/users')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLET, UsersSchemas)

  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLET)

  }
};
