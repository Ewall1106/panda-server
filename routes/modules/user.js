const router = require('@koa/router')();
const UserController = require('../../controller/UserController');

router.prefix('/user');

router.get('/info', UserController.getUserInfo);
router.post('/registry', UserController.registry);
router.post('/login', UserController.login);
router.post('/reset', UserController.reset);
router.post('/address', UserController.addAddress);
router.get('/address', UserController.getAddress);
router.put('/address', UserController.updateAddress);
router.delete('/address', UserController.deleteAddress);
router.get('/address/list', UserController.getAddressList);
router.put('/address/list', UserController.setAddressList);

module.exports = router;
