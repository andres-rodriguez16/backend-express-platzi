const express = require('express');
const routes = express.Router();
const CostumerService = require('../services/costumers');
const validatorHandler = require('../middleweres/validatorHandles');
const Passport = require('passport');

const {
  createCostumerSchemas,
} = require('../schemas/costumers');

const service = new CostumerService();

routes.get('/', async (req, res, next) => {
  try {
    const costumers = await service.find();
    return res.status(200).json(costumers);
  } catch (error) {
    next(error);
  }
});

routes.post(
  '/',  Passport.authenticate('jwt', { session: false }),
  validatorHandler(createCostumerSchemas, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCostumer = await service.create(body);
      res.status(201).json(newCostumer);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = routes;
