'use strict';

const Controller = require('egg').Controller;

class PublicController extends Controller {
  async captcha() {
    const { ctx } = this;
    const id = ctx.query.id;
    ctx.body = await ctx.service.public.create(id);
  }
}

module.exports = PublicController;
