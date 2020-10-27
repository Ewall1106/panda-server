const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'mkt_home_exhibitions',
  new mongoose.Schema({
    img: String,
    title: String,
    tagnum: Number,
    discount: Number,
    time: {
      type: Number,
      default: Date.now,
    },
  })
);
