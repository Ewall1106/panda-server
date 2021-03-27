'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async signup() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.registry();
  }

  async signin() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.login();
  }

  async getInfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getInfo();
  }
}

module.exports = UserController;
