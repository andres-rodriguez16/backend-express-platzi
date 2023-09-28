const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
class OrderService {
  constructor() {}
  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId,
      },
      include: ['user'],
    });
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    console.log(customer.id);
    const newOrder = await models.Order.create({ customerId: customer.id });
    return newOrder;
  }
  async find() {
    const allOrders = await models.Order.findAll();
    return allOrders;
  }
  async findByUser(userId) {
    const order = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    // delete order[0].dataValues.customer.user.password;
    return order;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return order;
  }
  async addItem(item) {
    const newItem = await models.OrderProduct.create(item);
    return newItem;
  }
  async update(id, changes) {
    return { id, changes };
  }
  async delete(id) {
    return { id };
  }
}
module.exports = OrderService;
