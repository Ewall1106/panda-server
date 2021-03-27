'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MktCategorySchema = new Schema({
    id: Number,
    icon: String,
    name: String,
  });

  return mongoose.model('mkt_category', MktCategorySchema);
};
