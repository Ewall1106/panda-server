const router = require('@koa/router')();
const OrderController = require('../../controller/OrderController');

router.prefix('/order');

router.get('/cart/list', OrderController.getCartList);
router.delete('/cart/delete', OrderController.deleteCart);
router.post('/cart/add', OrderController.addCartItem);
router.get('/cart/num', OrderController.getCartNum);
router.post('/list', OrderController.getList);
router.post('/settle', OrderController.settleOrder);
router.get('/user-list', OrderController.getUserList);

module.exports = router;
