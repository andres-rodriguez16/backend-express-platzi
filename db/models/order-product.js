const { Model, DataTypes } = require('sequelize');
const { PRODUCT_TABLET } = require('../models/productos');
const { ORDER_TABLE } = require('../models/orders');

const ORDER_PRODUCT = 'orders_product';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: PRODUCT_TABLET,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  orderId: {
    ield: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: ORDER_PRODUCT,
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
};

class OrderProduct extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT };
