const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const { User } = require('../../db/models/users');
const bcrypt = require('bcrypt');
// const pool = require('../../libs/postgresPool');
class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hash,
    });
    // const { createdAt, id, email, role } = newUser;
    // return {
    //   createdAt,
    //   id,
    //   email,
    //   role,
    // };
    delete newUser.password;
    return newUser;
  }

  async find() {
    // pool
    // const query = 'SELECT * from task';
    // const rta = await pool.query(query);
    // return rta.rows;

    // sequelize
    const user = await User.findAll({
      include: ['customer'],
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

  async findByPk(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
  async update(id, changes) {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      user.update(changes);
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
