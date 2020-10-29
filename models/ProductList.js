const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'product_lists',
  new mongoose.Schema({
    productId: String,
    img: String,
    title: String,
    desc: String,
    price: Number,
    oldPrice: Number,
    discount: Number,
    percentage: Number,
  })
);
