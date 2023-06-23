const boom = require('@hapi/boom');
const { Customer } = require('../../db/models/costumers');
const bcrypt = require('bcrypt');

class CostumerService {
  constructCustomer;
  async find() {
    const costumer = await Customer.findAll({
      include: ['user', 'order'],
    });
    return costumer;
  }
  async findOne(id) {
    const costumer = await Customer.findByPk(id);
    if (!costumer) {
      throw boom.notFound(
        'Costumer not found',
        `No existe el usuario con ID ${id}`
      );
    } else return user;
  }
  async create(date) {
    const hash = await bcrypt.hash(date.user.password, 10);
    const newDate = {
      ...date,
      user: {
        ...date.user,
        password: hash,
      },
    };
    const newCostumer = await Customer.create(newDate, {
      include: ['user'],
    });
    delete newCostumer.user.dataValues.password;;
    return newCostumer;
  }

  async update(id, changes) {
    const costumer = await Customer.findOne({
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
    const costumer = await CCustomer.findByPk(id);
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
