'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MktBannerSchema = new Schema({
    img: String,
    type: Number,
  });

  return mongoose.model('mkt_banner', MktBannerSchema);
};
