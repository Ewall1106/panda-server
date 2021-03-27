'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ProductSchema = new Schema({
    productId: String,
    img: String,
    title: String,
    desc: String,
    price: Number,
    oldPrice: Number,
    discount: Number,
    percentage: Number,
    banner: Array,
    details: Array,
  });

  return mongoose.model('product_list', ProductSchema);
};
