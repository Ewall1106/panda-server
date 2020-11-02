const OrderCart = require('../models/OrderCart');
const ProductSku = require('../models/ProductSku');
const ProductList = require('../models/ProductList');

const { getJwtPayload } = require('../utils');

const OrderController = {
  // 获取购物车列表
  async getCartList(ctx) {
    const data = await OrderCart.find({});
    ctx.body = {
      code: 200,
      entry: data,
    };
  },

  // 加入购物车
  async addCartItem(ctx) {
    const { uid } = await getJwtPayload(ctx.header.authorization);
    const { productId, skuId, selectedNum } = ctx.request.body;

    // 该sku在用户购物车中是否已经存在
    const userSku = await OrderCart.findOne({ uid, skuId });
    if (userSku && userSku.skuId) {
      let num = userSku.num + selectedNum;
      await OrderCart.updateOne({ uid, skuId }, { num });
    } else {
      const skuItem = await ProductSku.findOne({
        skuId,
      });
      const goods = await ProductList.findOne({ productId });

      const data = {
        uid,
        skuId,
        img: skuItem.imgUrl,
        title: goods.title,
        desc: goods.desc,
        tag: skuItem.tag,
        tags: skuItem.tags,
        price: skuItem.price,
        oldPrice: skuItem.oldPrice,
        num: selectedNum,
      };

      await OrderCart.create(data);
    }

    ctx.body = {
      code: 200,
      message: '加入购物车成功',
    };
  },
};

module.exports = OrderController;
