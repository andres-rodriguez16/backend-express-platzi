const express = require('express');
const OrderService = require('../services/orders');
const validatorHandles = require('../middleweres/validatorHandles');
const {
  getOrderSchemas,
  createOrderSchemas,
  addItemSchema,
} = require('../schemas/orders');

const router = express.Router();
const service = new OrderService();

router.get(
  '/:id',
  validatorHandles(getOrderSchemas, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});
router.post(
  '/',
  validatorHandles(createOrderSchemas, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/add-item',
  validatorHandles(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
