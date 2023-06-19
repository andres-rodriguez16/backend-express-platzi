const boom = require('@hapi/boom');
const { Costumers } = require('../../db/models/costumers');
const { User } = require('../../db/models/users');

class CostumerService {
  constructor() {}

  async find() {
    const costumer = await Costumers.findAll({
      include: ['user'],
    });
    return costumer;
  }
  async findOne(id) {
    const costumer = await Costumers.findByPk(id);
    if (!costumer) {
      throw boom.notFound(
        'Costumer not found',
        `No existe el usuario con ID ${id}`
      );
    } else return user;
  }
  async create(date) {
    const newCostumer = await Costumers.create(date, {
      include : ['user']
    });
    return newCostumer;
  }

  async update(id, changes) {
    const costumer = await Costumers.findOne({
      where: {
        id: id,
      },
    });
    if (costumer) {
      costumer.update(changes);
      return {
        id,
        changes,
      };
    } else
      throw boom.notFound(
        'Costumer not found',
        `No existe el Costumer con ID ${id}`
      );
  }
  async delete(id) {
    const costumer = await Costumers.findByPk(id);
    if (id) {
      await costumer.destroy();
      return { message: 'Costumer deleted' };
    } else {
      throw boom.notFound(
        'Costumer not found',
        `No existe el usuario con ID ${id}`
      );
    }
  }
}

module.exports = CostumerService;
