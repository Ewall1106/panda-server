const router = require('@koa/router')();
const OrderController = require('../../controller/OrderController');

router.prefix('/order');

router.get('/cart/list', OrderController.getCartList);
router.post('/cart/add', OrderController.addCartItem);

module.exports = router;
