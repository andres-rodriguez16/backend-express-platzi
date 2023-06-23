const productosRouter = require('./productos');
const userRouter = require('./users');
const costumersRouter = require('./costumers');
const CategoryRouter = require('./category');
const OrderRouter = require('./orders');
const authRouter = require('./auth');
const express = require('express');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', productosRouter);
  router.use('/users', userRouter);
  router.use('/costumers', costumersRouter);
  router.use('/category', CategoryRouter);
  router.use('/orders', OrderRouter);
  router.use('/auth', authRouter);
};

module.exports = routerApi;
