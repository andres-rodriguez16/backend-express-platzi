const userService = require('../services/users');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  jsonSecret,
  nodemailEmail,
  nodemailPass,
} = require('../../config/config');
const service = new userService();
const nodemailer = require('nodemailer');
class AuthService {
  async getUser(email, password) {
    const user = await service.findByPk(email);
    if (!user) {
      throw Boom.unauthorized();
    }
    const valitationPassword = bcrypt.compare(password, user.password);
    if (!valitationPassword) {
      throw Boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, jsonSecret);
    return {
      user,
      token,
    };
  }
  async sendRecoveyPassword(email) {
    const user = await service.findByPk(email);
    if (!user) {
      throw Boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, jsonSecret, { expiresIn: '15m' });
    const link = `http://localhost:3001/recovey?token=${token}`;
    await service.update(user.id, { recoveyToken: token });
    const mail = {
      from: nodemailEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'email para recuperar contraseña', // Subject line
      // text: 'Hello world?', // plain text body
      html: `<b>Ingresa a este link para recuperar contraseña ${link}</b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: nodemailEmail,
        pass: nodemailPass,
      },
    });
    await transporter.sendMail(infoMail);
    return {
      message: 'mail sended',
    };
  }
  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, jsonSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveyToken !== token) {
        throw Boom.unauthorized();
      }
      const hash = bcrypt.hash(newPassword, 10)
      await service.update(user.id, { recoveyToken: null, password : hash });
      return {
        message : 'password changed'
      }
    } catch (error) {
      throw Boom.unauthorized();
    }
  }
}

module.exports = AuthService;
