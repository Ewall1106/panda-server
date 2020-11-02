const ProductList = require('../models/ProductList');
const ProductSku = require('../models/ProductSku');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('123456789', 6);

const ProductController = {
  // 获取商品列表
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

  // 商品商品详情
  async getDetail(ctx) {
    const { productId } = ctx.request.body;

    if (!productId) {
      ctx.body = {
        code: 400,
        message: '请输入正确的商品id',
      };
      return;
    }

    const data = await ProductList.findOne({ productId });
    const sku = await ProductSku.find({ productId });

    // format tree
    const tree = [];
    const { attrNameKey, attrNameDetail } = sku[0];

    attrNameKey.forEach((attr, idx) => {
      tree.push({
        k: attr,
        k_s: `s${idx}`,
        v: [],
      });
    });

    attrNameDetail.forEach((item, idx) => {
      for (let i = 0; i < item.length; i++) {
        const { id, attr, detail } = item[i];
        tree[idx].v.push({
          id,
          name: attr,
          imgUrl: detail.imgUrl,
          previewImgUrl: detail.previewImgUrl,
        });
      }
    });

    // format list
    const list = [];
    sku.forEach((item) => {
      list.push({
        id: item.skuId,
        productId: item.productId,
        s0: item.s0,
        s1: item.s1,
        name: item.name,
        price: item.price,
        stock_num: item.stockNum,
        tag: item.tag,
        tags: item.tags,
      });
    });

    ctx.body = {
      code: 200,
      entry: {
        productId: data.productId,
        banner: data.banner,
        title: data.title,
        desc: data.desc,
        price: data.price,
        oldPrice: data.oldPrice,
        service: ['七天无理由退款', '熊猫商城自营', '送货上门'],
        serviceDetail: [],
        sku: {
          tree,
          list,
          price: '1231',
          collection_id: '',
          hide_stock: false,
          none_sku: false,
          messages: [],
          stock_num: 227,
        },
        goods: { picture: data.banner[0] },
        details: data.details,
      },
    };
  },
};

module.exports = ProductController;
