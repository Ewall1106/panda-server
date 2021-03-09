'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async signup() {
    const { ctx } = this;
    const value = ctx.request.body;
    await ctx.service.user.create(value);
  }

  async signin() {
    const { ctx } = this;
    ctx.body = 'hi, eg111g';
  }
}

module.exports = UserController;
