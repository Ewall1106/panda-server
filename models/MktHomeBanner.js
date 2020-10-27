const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'mkt_home_banners',
  new mongoose.Schema({
    img: String,
    type: Number,
    
  })
);
