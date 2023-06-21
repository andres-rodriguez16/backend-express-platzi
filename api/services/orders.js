const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
class OrderService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async find() {
    const allOrders = await models.Order.findAll();
    return allOrders;
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
