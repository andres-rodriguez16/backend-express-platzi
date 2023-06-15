const express = require('express');
const { faker } = require('@faker-js/faker');
const routes = express.Router();

routes.get('/', (req, res) => {
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      name: faker.person.fullName(),
      sex: faker.person.sex(),
    });
  }
  res.json(users)
});

module.exports = routes;
