'use strict';

const Controller = require('egg').Controller;

class PublicController extends Controller {
  async captcha() {
    const { ctx } = this;
    const id = ctx.query.id;
    const { data } = await ctx.service.public.create(id);
    ctx.body = {
      code: 200,
      status: true,
      message: '获取图形验证码成功',
      data,
    };
  }
}

module.exports = PublicController;
