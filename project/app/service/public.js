'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class PublicService extends Service {
  async create(id) {
    const { data } = svgCaptcha.create({
      width: 100,
      height: 30,
      fontSize: 38,
      color: false,
    });

    return {
      data,
    };
  }
}

module.exports = PublicService;
