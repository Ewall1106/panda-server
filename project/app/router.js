'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // userInfo
  router.post('/user/signup', controller.user.signup);
  router.post('/user/signin', controller.user.signin);

  // public
  router.get('/public/captcha', controller.public.captcha);
};
