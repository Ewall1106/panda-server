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
      code: 200,
      status: true,
      message: '获取图形验证码成功',
      data,
    };
  }
}

module.exports = PublicService;
