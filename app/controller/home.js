'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getBanner() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.getBanner();
  }

  async getCategory() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.getCategory();
  }

  async getList() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.getList();
  }
}

module.exports = HomeController;
