const express = require('express');
const routes = express.Router();
const ProductService = require('../services/productos');
const Passport = require('passport');

const {
  updateProductSchemas,
  createProductSchemas,
  getProductSchemas,
  queryProductSchemas,
} = require('../schemas/productos');

const validatorHandles = require('../middleweres/validatorHandles');
const services = new ProductService();

routes.get(
  '/filter',
  validatorHandles(queryProductSchemas, 'query'),
  async (req, res) => {
    const { limit, offset, price, minPrice, maxPrice } = req.query;
    const productos = await services.find(
      limit,
      offset,
      price,
      minPrice,
      maxPrice
    );
    res.status(200).json(productos);
  }
);

routes.get('/', async (req, res) => {
  const productos = await services.find();
  res.status(200).json(productos);
});

routes.get(
  '/:id',
  validatorHandles(getProductSchemas, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await services.findOne(id));
    } catch (error) {
      next(error);
    }
  }
);

routes.get('/filter', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
  res.json({});
});
// tratar de no colocar rutas  similares porque chocan, porque filter se esta tomando como un id,
// para evitar esto se cambia el orden de las rutas
routes.get('/filter', (req, res) => {
  res.send('productos');
});

routes.post(
  '/',
  Passport.authenticate('jwt', { session: false }),
  validatorHandles(createProductSchemas, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProducto = await services.create(body);
    res.status(201).json({
      message: 'created',
      data: newProducto,
    });
  }
);

routes.patch(
  '/:id',
  Passport.authenticate('jwt', { session: false }),
  validatorHandles(getProductSchemas, 'params'),
  validatorHandles(updateProductSchemas, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newProduct = await services.update(id, body);
      res.send({
        message: 'updated',
        data: newProduct,
      });
    } catch (error) {
      // res.status(404).json({
      //   message: error.message,
      // });
      next(error);
    }
  }
);

routes.delete(
  '/:id',
  Passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedProduct = await services.delete(id);
      res.send({
        message: 'Deleted',
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
