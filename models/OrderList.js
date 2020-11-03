const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'order_list',
  new mongoose.Schema({
    uid: String,
    orderId: String,
    list: Array,
  })
);
