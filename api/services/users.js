const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const { User } = require('../../db/models/users');
// const pool = require('../../libs/postgresPool');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await User.create(data);
    return newUser;
  }

  async find() {
    // pool
    // const query = 'SELECT * from task';
    // const rta = await pool.query(query);
    // return rta.rows;

    // sequelize
    const user = await User.findAll({
      include: ['customer']
    });
    return user;
  }

  async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound(
        'User not found',
        `No existe el usuario con ID ${id}`
      );
    } else return user;
  }

  async update(id, changes) {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      user.update(changes);
      // const user = await User.update(
      //   {
      //     ...changes,
      //   },
      //   {
      //     where: {
      //       id: Number(id),
      //     },
      //   }
      // );
      return {
        id,
        changes,
      };
    } else
      throw boom.notFound(
        'User not found',
        `No existe el usuario con ID ${id}`
      );
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (id) {
      await user.destroy();
      return { message: 'User deleted' };
    } else {
      throw boom.notFound(
        'User not found',
        `No existe el usuario con ID ${id}`
      );
    }
  }
}

module.exports = UserService;
