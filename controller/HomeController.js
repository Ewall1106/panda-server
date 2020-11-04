const MktHomeBanner = require('../models/MktHomeBanner');
const MktHomeShelf = require('../models/MktHomeShelf');
const MktHomeExhibition = require('../models/MktHomeExhibition');
const ProductList = require('../models/ProductList');

const HomeController = {
  async getBanner(ctx) {
    const data = await MktHomeBanner.find({});
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  async getCategory(ctx) {
    const data = await MktHomeShelf.find({});
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  async getSession(ctx) {
    const data = await MktHomeExhibition.find({});
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  async getList(ctx) {
    const { pageSize, pageNo } = ctx.request.body;
    const list = await ProductList.find({})
      .limit(pageSize)
      .skip(pageSize * (pageNo - 1));

    const data = list.reduce((memo, current, index, array) => {
      memo[index] = {
        productId: current.productId,
        img: current.img,
        title: current.title,
        desc: current.desc,
        price: current.price,
        oldPrice: current.price,
      };
      return memo;
    }, []);

    ctx.body = {
      code: 200,
      entry: data,
    };
  },
};

module.exports = HomeController;
