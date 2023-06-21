const { Model, DataTypes } = require('sequelize');
const { CUSTOMERS_TABLET } = require('../models/costumers');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: CUSTOMERS_TABLET,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  // solo para calcular datos pequeños, es mas recomendable ese calculo con una query de sql
  // total: {
  //   type: DataTypes.VIRTUAL,
  //   get() {
  //     if (this.items.length > 0) {
  //       return this.items.reduce((total, item) => {
  //         return total + item.price * item.OrderProduct.amount;
  //       }, 0);
  //     }
  //     return 0;
  //   },
  // },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
