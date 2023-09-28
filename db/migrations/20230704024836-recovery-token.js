'use strict';
const { USER_TABLET } = require('../models/users');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLET, 'recovey_token', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLET, 'recovey_token');
  },
};
