'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getBanner() {
    const { ctx } = this;
    const data = ctx.model.Mkt.find({});

    return {
      code: 200,
      data,
    };
  }
}

module.exports = HomeService;
