const { User, UsersSchemas } = require('./users');
const { Product, ProductsSchemas } = require('./productos');
const { Customer, CustomerSchemas } = require('./costumers');
const { Category, CategoriesSchemas } = require('./category');
const { Order, OrderSchema } = require('./orders');
const { OrderProduct, OrderProductSchema } = require('./order-product');

function setupModels(sequelize) {
  User.init(UsersSchemas, User.config(sequelize));
  Product.init(ProductsSchemas, Product.config(sequelize));
  Customer.init(CustomerSchemas, Customer.config(sequelize));
  Category.init(CategoriesSchemas, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  // asociaciones
  Product.associate(sequelize.models);
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
