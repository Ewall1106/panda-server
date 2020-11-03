const OrderCart = require('../models/OrderCart');
const ProductSku = require('../models/ProductSku');
const ProductList = require('../models/ProductList');
const OrderList = require('../models/OrderList');

const { getJwtPayload } = require('../utils');
const { nanoid } = require('nanoid');

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

  // 获取确认订单列表
  async getList(ctx) {
    const { ids } = ctx.request.body;

    const skuId = ids.reduce((memo, current, index, array) => {
      memo[index] = current.id;
      return memo;
    }, []);

    const list = await ProductSku.find({ skuId: { $in: skuId } });

    const rlt = list.reduce((memo, current, index, array) => {
      memo.push({
        skuId: current.skuId,
        title: current.title,
        skuAttr: current.skuAttr,
        price: current.price,
        imgUrl: current.imgUrl,
        selectedNum: ids[index].selectedNum,
      });
      return memo;
    }, []);

    ctx.body = {
      code: 200,
      entry: rlt,
    };
  },

  // 确认订单
  async settleOrder(ctx) {
    const { uid, list } = ctx.request.body;
    const orderId = nanoid();
    await OrderList.create({
      orderId,
      uid,
      list,
    });
    ctx.body = {
      code: 200,
      entry: orderId,
      message: '创建订单成功',
    };
  },
};

module.exports = OrderController;
