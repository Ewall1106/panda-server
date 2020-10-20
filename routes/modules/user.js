const router = require('@koa/router')();
const UserController = require('../../controller/UserController');

router.prefix('/user');

router.get('/info', UserController.getUserInfo);
router.post('/registry', UserController.registry);
router.post('/login', UserController.login);
router.post('/reset', UserController.reset);

module.exports = router;
