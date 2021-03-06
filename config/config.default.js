/* eslint valid-jsdoc: "off" */

'use strict';

const { DB_URL } = require('./config');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609677594131_5582';

  // add your middleware config here
  config.middleware = [];

  // mongodb
  config.mongoose = {
    url: DB_URL,
    options: {
      useUnifiedTopology: true,
    },
    // mongoose global plugins, expected a function or an array of function and options
    plugins: [],
  };

  // jwt
  config.jwt = {
    secret: 'panda',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // cors
  config.cors = {
    origin: ctx => ctx.get('origin'),
    credentials: true,
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
