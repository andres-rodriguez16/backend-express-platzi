const { Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLET } = require('./category');
const PRODUCT_TABLET = 'products';

const ProductsSchemas = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  isBlock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW,
    unique: true,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLET,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLET,
      modelName: 'Product',
      timestamps: false,
    };
  }
}
module.exports = { PRODUCT_TABLET, Product, ProductsSchemas };
