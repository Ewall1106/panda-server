'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MktSchema = new Schema({
    banner: { type: Array, default: [] },
  });

  return mongoose.model('Mkt', MktSchema);
};
