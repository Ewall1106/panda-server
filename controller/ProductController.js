const ProductList = require('../models/ProductList');
const ProductDetail = require('../models/ProductDetail');

const ProductController = {
  async getList(ctx) {
    const { pageSize, pageNo } = ctx.request.body;
    const data = await ProductList.find({})
      .limit(pageSize)
      .skip(pageSize * (pageNo - 1));

    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  async getDetail(ctx) {
    const { productId } = ctx.request.body;
    
    if (!productId) {
      ctx.body = {
        code: 400,
        message: '请输入正确的商品id',
      };
      return;
    }

    const data = await ProductDetail.findOne({ productId });
    
    ctx.body = {
      code: 200,
      entry: data,
    };
  },
};

module.exports = ProductController;
