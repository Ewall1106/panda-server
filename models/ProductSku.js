const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'product_sku',
  new mongoose.Schema({
    skuId: String,
    productId: String,
    name: String,
    price: Number,
    oldPrice: Number,
    skuAttr: Array,
    attrNameKey: Array,
    s0: String,
    s1: String,
    attrNameDetail: Array,
    stockNum: Number,
    tag: String,
    tags: Array,
    img: Array,
    imgUrl: String,
    previewImgUrl: String,
  })
);
