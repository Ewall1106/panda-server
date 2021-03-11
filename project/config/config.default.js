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
  const config = exports = {};

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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
