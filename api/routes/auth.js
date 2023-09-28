const express = require('express');
const Passport = require('passport');
const authService = require('../services/auth');
const service = new authService();
const router = express.Router();
router.post(
  '/login',
  Passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const tokenUser = service.signToken(user);
      res.status(201).json(tokenUser);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveyPassword(email);
    res.status(200).json(rta);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.status(200).json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
