'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getBanner() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.getBanner();
  }
}

module.exports = HomeController;
