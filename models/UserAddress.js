const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'user_address',
  new mongoose.Schema({
    uid: String,
    addressId: String,
    name: String,
    tel: Number,
    province: String,
    city: String,
    county: String,
    addressDetail: String,
    areaCode: String,
    postalCode: String,
    fullAddress: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  })
);
