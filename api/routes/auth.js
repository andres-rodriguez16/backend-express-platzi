const express = require('express');
const Passport = require('passport');
const jwt = require('jsonwebtoken');
const { jsonSecret } = require('../../config/config');
const router = express.Router();

router.post(
  '/login',
  Passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, jsonSecret, { expiresIn: '1h' });
      res.json({
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
