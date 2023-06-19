const productosRouter = require('./productos');
const userRouter = require('./users');
const costumersRouter = require('./costumers');
const express = require('express');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', productosRouter);
  router.use('/users', userRouter);
  router.use('/costumers', costumersRouter);
};

module.exports = routerApi;
