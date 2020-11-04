const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'order_carts',
  new mongoose.Schema({
    uid: String,
    productId: String,
    desc: String,
    skuId: String,
    img: String,
    title: String,
    tag: String,
    tags: Array,
    price: Number,
    oldPrice: Number,
    num: Number,
    skuAttr: Array,
  })
);
