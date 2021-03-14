'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // home
  router.get('/home/banner', controller.home.getBanner);
  router.get('/home/category', controller.home.getCategory);
  router.post('/home/list', controller.home.getList);

  // userInfo
  router.post('/user/signup', controller.user.signup);
  router.post('/user/signin', controller.user.signin);
  router.get('/user/info', controller.user.getInfo);

  // public
  router.get('/public/captcha', controller.public.captcha);
};
