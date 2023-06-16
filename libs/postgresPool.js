const { Pool } = require('pg');
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

const pool = new Pool({ connectionString: URI });

module.exports = pool;
