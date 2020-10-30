const OrderCart = require('../models/OrderCart');
const ProductDetail = require('../models/ProductDetail');

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

    // 该sku在用户购物车中已经存在
    const userSku = await OrderCart.findOne({ uid, skuId });
    if (userSku && userSku.skuId) {
      let num = userSku.num + selectedNum;
      await OrderCart.updateOne({ uid, skuId }, { num });
    } else {
      const { title, desc, banner, sku } = await ProductDetail.findOne({
        productId,
      });

      const skuItem = sku.list.find((item) => item.id === skuId);
      const data = {
        uid,
        productId,
        skuId,
        img: banner[0],
        title,
        desc,
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
