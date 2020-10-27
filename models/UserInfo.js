const mongoose = require('../config/mongo.js');

module.exports = mongoose.model(
  'user_infos',
  new mongoose.Schema({
    uid: String,
    username: String,
    password: String,
    nickname: String,
    avatar: String,
    age: Number,
    role: Number,
    gender: {
      type: Number,
      default: 0,
    },
    points: Number,
    mark: {
      type: String,
      default: '该用户暂无个性签名',
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  })
);
