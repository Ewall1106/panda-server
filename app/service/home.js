'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getBanner() {
    const { ctx } = this;
    const data = await ctx.model.MktBanner.find({});
    return {
      code: 200,
      status: true,
      message: '获取banner信息成功',
      data,
    };
  }

  async getCategory() {
    const { ctx } = this;
    const data = await ctx.model.MktCategory.find({});

    return {
      code: 200,
      status: true,
      message: '获取类目信息成功',
      data,
    };
  }

  async getList() {
    const { ctx } = this;
    const { pageSize, pageNo } = ctx.request.body;
    const list = await ctx.model.ProductList.find({})
      .limit(pageSize)
      .skip(pageSize * (pageNo - 1));

    const data = list.reduce((memo, current, index) => {
      memo[index] = {
        productId: current.productId,
        img: current.img,
        title: current.title,
        desc: current.desc,
        price: current.price,
        oldPrice: current.oldPrice,
      };
      return memo;
    }, []);

    return {
      code: 200,
      status: true,
      message: '获取商品列表信息成功',
      data,
    };
  }
}

module.exports = HomeService;
