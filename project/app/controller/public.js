'use strict';

const Controller = require('egg').Controller;

class PublicController extends Controller {
  async captcha() {
    const { ctx } = this;
    ctx.body = await ctx.service.public.create();
  }
}

module.exports = PublicController;
