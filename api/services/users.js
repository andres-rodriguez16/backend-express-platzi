const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const { User } = require('../../db/models/users');
// const pool = require('../../libs/postgresPool');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    // pool
    // const query = 'SELECT * from task';
    // const rta = await pool.query(query);
    // return rta.rows;

    // sequelize
    const user = await User.findAll();
    console.log(user);
    return user;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
