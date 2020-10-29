const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'product_details',
  new mongoose.Schema({
    productId: String,
    banner: Array,
    title: String,
    desc: String,
    price: Number,
    oldPrice: Number,
    service: Array,
    serviceDetail: Array,
    detail: String,
  })
);
