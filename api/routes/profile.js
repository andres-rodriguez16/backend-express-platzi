const express = require('express');
const Passport = require('passport');

const OrderService = require('../services/orders');
const { checkRoles } = require('../middleweres/authHandler');
const validatorHandler = require('../middleweres/validatorHandles');
// const {
//   upadateCategoriesSchemas,
//   createCategoriesSchemas,
//   getCategoriesSchemas,
// } = require('../schemas/categories');

const router = express.Router();
const service = new OrderService();

router.get(
  '/my-orders',
  Passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
