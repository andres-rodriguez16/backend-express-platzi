const boom = require('@hapi/boom');
const { Category } = require('../../db/models/category');
const { User } = require('../../db/models/users');
// const pool = require('../../libs/postgresPool');

class UserService {
  constructor() {}

  async create(data) {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async find() {
    const category = await Category.findAll();
    return category;
  }

  async findOne(id) {
    const category = await Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound(
        'category not found',
        `No existe el usuario con ID ${id}`
      );
    } else return category;
  }

  async update(id, changes) {
    const category = await Category.findOne({
      where: {
        id: id,
      },
    });
    if (category) {
      category.update(changes);
      return {
        id,
        changes,
      };
    } else
      throw boom.notFound(
        'category not found',
        `No existe el usuario con ID ${id}`
      );
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (id) {
      await category.destroy();
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
