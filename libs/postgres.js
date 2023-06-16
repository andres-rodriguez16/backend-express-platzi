const { Client } = require('pg');
const {
  port,
  dbHost,
  dbName,
  dbPassword,
} = require('../config.js/config')
const getConnect = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'andres',
    database: 'my_store',
    password: 'admin123',
  });
  await client.connect();
  return client;
};

module.exports = getConnect;
