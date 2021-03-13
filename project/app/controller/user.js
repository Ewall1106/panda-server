'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async signup() {
    const { ctx } = this;
    const value = ctx.request.body;
    ctx.body = await ctx.service.user.registry(value);
  }

  async signin() {
    const { ctx } = this;
    const value = ctx.request.body;
    ctx.body = await ctx.service.user.login(value);
  }

  async getInfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getInfo();
  }
}

module.exports = UserController;
