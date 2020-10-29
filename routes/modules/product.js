const router = require('@koa/router')();
const ProductController = require('../../controller/ProductController');

router.prefix('/product');

router.post('/list', ProductController.getList);
router.post('/detail', ProductController.getDetail);

module.exports = router;
