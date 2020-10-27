const MktHomeBanner = require('../models/MktHomeBanner');
const MktHomeShelf = require('../models/MktHomeShelf');
const MktHomeExhibition = require('../models/MktHomeExhibition');
const MktHomeProduct = require('../models/MktHomeProduct');

const HomeController = {
  async getBanner(ctx, next) {
    const data = await MktHomeBanner.find({});
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  async getCategory(ctx, next) {
    const data = await MktHomeShelf.find({});
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  async getSession(ctx, next) {
    const data = await MktHomeExhibition.find({});
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  async getList(ctx, next) {
    const { pageSize, pageNo } = ctx.request.body;
    const data = await MktHomeProduct.find({})
      .limit(pageSize)
      .skip(pageSize * (pageNo - 1));

    ctx.body = {
      code: 200,
      entry: data,
    };
  },
};

module.exports = HomeController;
