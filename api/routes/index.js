const productosRouter = require('./productos');
const userRouter = require('./users');
const express = require('express');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', productosRouter);
  router.use('/users', userRouter);
};

module.exports = routerApi;
