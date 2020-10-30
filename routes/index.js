const combineRouters = require('koa-combine-routers');

const user = require('./modules/user');
const home = require('./modules/home');
const product = require('./modules/product');
const order = require('./modules/order');
const category = require('./modules/category');
const search = require('./modules/search');
const public = require('./modules/public');

const router = combineRouters(user, home, product, order, category, search, public);

module.exports = router;
