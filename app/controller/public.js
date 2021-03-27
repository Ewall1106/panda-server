'use strict';

const Controller = require('egg').Controller;

class PublicController extends Controller {
  async captcha() {
    const { ctx } = this;
    ctx.body = await ctx.service.public.create();
  }

  async initCsrfToken() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      status: true,
      message: 'csrf-token设置成功',
    };
  }
}

module.exports = PublicController;
