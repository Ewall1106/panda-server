'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    uid: { type: String },
    username: { type: String },
    password: { type: String },
    nickname: { type: String },
    avatar: { type: String },
    createAt: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('User', UserSchema);
};
