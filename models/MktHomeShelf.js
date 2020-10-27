const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'mkt_home_shelfs',
  new mongoose.Schema({
    id: Number,
    icon: String,
    name: String,
    activityId: Number,
    exhibitionId: Number,
  })
);
