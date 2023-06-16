const { Sequelize } = require('sequelize');

const setupModels = require('../db/models');
const {
  dbHost,
  dbName,
  dbPort,
  dbUser,
  dbPassword,
} = require('../config.js/config');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
  logging: function (str) {
    console.log(str);
  },
});

setupModels(sequelize);

sequelize.sync();
module.exports = sequelize;
